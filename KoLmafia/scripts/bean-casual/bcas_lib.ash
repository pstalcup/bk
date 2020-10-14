
int get_property_int(string name) {
    string str = get_property(name);
    if (str == '') {
        abort('Unknown property ' + name + '.');
    }
    return to_int(str);
}

void set_property_int(string name, int value) {
    set_property(name, '' + value);
}

boolean get_property_boolean(string name) {
    string str = get_property(name);
    if (str == '') {
        abort('Unknown property ' + name + '.');
    }
    return str == 'true';
}

void set_choice(int adv, int choice) {
    set_property(`choiceAdventure{adv}`, `{choice}`);
}

int my_familiar_weight() {
    return familiar_weight(my_familiar()) + weight_adjustment();
}

void ensure_effect(effect ef, int turns) {
    if (have_effect(ef) < turns) {
        if (!cli_execute(ef.default) || have_effect(ef) == 0) {
            abort('Failed to get effect ' + ef.name + '.');
        }
    }
}

void ensure_effect(effect ef) {
    ensure_effect(ef, 1);
}

void try_ensure_effect(effect ef) {
    try {
        ensure_effect(ef);
    } finally {}
}

void try_ensure_skill(skill sk) {
    effect ef = sk.to_effect();
    if (have_skill(sk) && ef != $effect[none] && have_effect(ef) == 0) {
        use_skill(1, sk);
    }
}

void try_synthesize(effect ef) {
    if (have_effect(ef) == 0 && have_skill($skill[Sweet Synthesis])) sweet_synthesis(ef);
}

void shrug(effect ef) {
    if (have_effect(ef) > 0) {
        cli_execute('shrug ' + ef.name);
    }
}

// Mechanics for managing song slots.
// We have Stevedave's, Ur-Kel's on at all times during leveling; third and fourth slots are variable.
boolean[effect] song_slot_1 = $effects[Stevedave's Shanty of Superiority, Fat Leon's Phat Loot Lyric];
boolean[effect] song_slot_2 = $effects[Ur-Kel's Aria of Annoyance];
boolean[effect] song_slot_3 = $effects[Power Ballad of the Arrowsmith, The Magical Mojomuscular Melody, The Moxious Madrigal, Ode to Booze, Jackasses' Symphony of Destruction];
boolean[effect] song_slot_4 = $effects[Carlweather's Cantata of Confrontation, The Sonata of Sneakiness, Polka of Plenty];
void open_song_slot(effect song) {
    boolean[effect] song_slot;
    if (song_slot_1 contains song) song_slot = song_slot_1;
    else if (song_slot_2 contains song) song_slot = song_slot_2;
    else if (song_slot_3 contains song) song_slot = song_slot_3;
    else if (song_slot_4 contains song) song_slot = song_slot_4;
    foreach shruggable in song_slot {
        shrug(shruggable);
    }
}

void try_ensure_song(skill sk) {
    effect ef = sk.to_effect();
    if (have_effect(ef) == 0) {
        open_song_slot(ef);
        if (!cli_execute(ef.default) || have_effect(ef) == 0) {
            abort('Failed to get effect ' + ef.name + '.');
        }
    } else {
        print('Already have effect ' + ef.name + '.');
    }
}

void ensure_ode(int turns) {
    while (have_effect($effect[Ode to Booze]) < turns) {
        open_song_slot($effect[Ode to Booze]);
        use_skill(1, $skill[The Ode to Booze]);
    }
}

boolean try_use(int quantity, item it) {
    if (available_amount(it) > 0) {
        return use(quantity, it);
    } else {
        return false;
    }
}

void ensure_item(int qty, item it, int max_price) {
    int remaining = qty - item_amount(it);
    if (remaining <= 0) return;

    int get_closet = min(remaining, closet_amount(it));
    if (!take_closet(get_closet, it)) abort();
    remaining -= get_closet;
    if (remaining <= 0) return;

    int get_mall = min(remaining, shop_amount(it));
    if (!take_shop(get_mall, it)) abort();
    remaining -= get_mall;
    if (remaining <= 0) return;

    if (!retrieve_item(remaining, it)) {
        if (buy(remaining, it, max_price) < remaining) abort(`Mall price too high for {it.name}.`);
    }
}

int[string] clan_cache;
boolean set_clan(string target) {
	if ( get_clan_name() != target ) {
		if (!(clan_cache contains target)) {
			string recruiter = visit_url("clan_signup.php");
			matcher m = create_matcher(`<option value=([0-9]+)>([^<]+)</option>`, recruiter);
			while (m.find()) {
				clan_cache[m.group(2)] = m.group(1).to_int();
			}
		}

		visit_url(`showclan.php?whichclan={clan_cache[target]}&action=joinclan&confirm=on&pwd={my_hash()}`);
		if ( get_clan_name() != target ) {
			abort ("failed to switch clans to " + target + ". Did you spell it correctly? Are you whitelisted?");
		}
	}
	return true;
}

void maximize_cached(string objective) {
    objective += objective.length() > 0 ? ", equip Powerful Glove" : "equip Powerful Glove";
    if (get_property("bcas_objective") == objective) return;
    set_property("bcas_objective", objective);
    maximize(objective, false);
}

int get_step(string quest_name) {
    string string_step = get_property(quest_name);
    if (string_step == "unstarted") return -1;
    else if (string_step == "started") return 0;
    else if (string_step == "finished") return 999;
    else {
        if (string_step.substring(0, 4) != "step") abort("Quest state parsing error.");
        return string_step.substring(4).to_int();
    }
}

import <bcas_lib.ash>

// multi_fight() stolen from Aenimus: https://github.com/Aenimus/aen_cocoabo_farm/blob/master/scripts/aen_combat.ash.
// Thanks! Licensed under MIT license.
void multi_fight() {
    while (in_multi_fight()) run_combat();
    if (choice_follows_fight()) visit_url("choice.php");
}

buffer m_new() {
    buffer buf;
    return buf;
}

buffer m_new(string init) {
    buffer buf;
    buf.append(init);
    return buf;
}

string m_submit(buffer macro) {
    print(`Submitting macro: {macro}`);
    return visit_url("fight.php?action=macro&macrotext=" + url_encode(macro), true, true);
}

buffer m_step(buffer macro, string next) {
    if (macro.length() > 0) macro.append(";");
    macro.append(next);
    return macro;
}

string m_monster(monster m) {
    return `monstername "{m.name}"`;
}

buffer m_if(buffer macro, string condition, string next) {
    return macro.m_step(`if {condition}`).m_step(next).m_step("endif");
}

buffer m_if(buffer macro, string condition, string next1, string next2) {
    return macro.m_if(condition, `{next1};{next2}`);
}

buffer m_if(buffer macro, string condition, string next1, string next2, string next3) {
    return macro.m_if(condition, `{next1};{next2};{next3}`);
}

buffer m_external_if(buffer macro, boolean condition, buffer next) {
    if (condition) return macro;
    else return macro.m_step(next);
}

buffer m_repeat(buffer macro) {
    return macro.m_step("repeat");
}

string m_repeat_submit(buffer macro) {
    return macro.m_step("repeat").m_submit();
}

buffer m_skill(buffer macro, skill sk) {
    string name = sk.name.replace_string("%fn, ", "");
    return macro.m_if(`hasskill {name}`, `skill {name}`);
}

buffer m_skill_repeat(buffer macro, skill sk) {
    return macro.m_skill(sk).m_repeat();
}

buffer m_item(buffer macro, item it) {
    if (available_amount(it) > 0) {
        return macro.m_step(`use {it.name}`);
    } else return macro;
}

buffer m_kill(buffer macro) {
    return macro
        .m_skill($skill[Stuffed Mortar Shell])
        .m_skill_repeat($skill[Saucegeyser])
        .m_skill_repeat($skill[Saucestorm]);
}

string MODE_NULL = "";
string MODE_CUSTOM = "custom";
string MODE_FIND_MONSTER_SABER_YR = "findsaber";
string MODE_FIND_MONSTER_THEN = "findthen";
string MODE_RUN_UNLESS_FREE = "rununlessfree";
string MODE_KILL = "kill";

void set_hccs_combat_mode(string mode) {
    set_property("_hccsCombatMode", mode);
}

void set_hccs_combat_mode(string mode, string arg) {
    set_property("_hccsCombatMode", mode);
    set_property("_hccsCombatArg1", arg);
}

void set_hccs_combat_mode(string mode, string arg1, string arg2) {
    set_property("_hccsCombatMode", mode);
    set_property("_hccsCombatArg1", arg1);
    set_property("_hccsCombatArg2", arg2);
}

string get_hccs_combat_mode() {
    return get_property("_hccsCombatMode");
}

string get_hccs_combat_arg1() {
    return get_property("_hccsCombatArg1");
}

string get_hccs_combat_arg2() {
    return get_property("_hccsCombatArg2");
}

monster[string] banished_monsters() {
    string banished_string = get_property("banishedMonsters");
    string[int] banished_components = banished_string.split_string(":");
    monster[string] result;
    if (banished_components.count() < 3) return result;
    for idx from 0 to banished_components.count() / 3 - 1 {
        monster foe = banished_components[idx * 3].to_monster();
        string banisher = banished_components[idx * 3 + 1];
        print(`Banished {foe.name} using {banisher}`);
        result[banisher] = foe;
    }
    return result;
}

boolean used_banisher_in_zone(monster[string] banished, string banisher, location loc) {
    print(`Checking to see if we've used {banisher} in {loc}.`);
    if (!(banished contains banisher)) return false;
    print(`Used it to banish {banished[banisher].name}`);
    return (loc.get_location_monsters() contains banished[banisher]);
}

void main(int initround, monster foe, string page) {
    string mode = get_hccs_combat_mode();
    location loc = my_location();
    if (mode == MODE_CUSTOM) {
        m_new(get_hccs_combat_arg1()).m_repeat_submit();
    } else if (mode == MODE_FIND_MONSTER_THEN) {
        int monster_id = get_hccs_combat_arg1().to_int();
        monster desired = monster_id.to_monster();
        monster[string] banished = banished_monsters();
        if (foe == desired) {
            set_property("_hccsCombatFound", "true");
            m_new(get_hccs_combat_arg2()).m_repeat_submit();
        } else if (my_mp() >= 50 && have_skill($skill[Snokebomb]) && get_property_int("_snokebombUsed") < 3 && !used_banisher_in_zone(banished, "snokebomb", loc)) {
            use_skill(1, $skill[Snokebomb]);
        /* } else if (have_skill($skill[Reflex Hammer]) && get_property_int("_reflexHammerUsed") < 3 && !used_banisher_in_zone(banished, "Reflex Hammer", loc)) {
            use_skill(1, $skill[Reflex Hammer]); */
        } else if (have_skill($skill[Macrometeorite]) && get_property_int("_macrometeoriteUses") < 10) {
            use_skill(1, $skill[Macrometeorite]);
        } else if (have_skill($skill[CHEAT CODE: Replace Enemy]) && get_property_int("_powerfulGloveBatteryPowerUsed") <= 80) {
            int original_battery = get_property_int("_powerfulGloveBatteryPowerUsed");
            use_skill(1, $skill[CHEAT CODE: Replace Enemy]);
            int new_battery = get_property_int("_powerfulGloveBatteryPowerUsed");
            if (new_battery == original_battery) {
                print("WARNING: Mafia is not updating PG battery charge.");
                set_property("_powerfulGloveBatteryPowerUsed", "" + (new_battery + 10));
            }
            // Hopefully at this point it comes back to the consult script.
        }
    } else if (mode == MODE_RUN_UNLESS_FREE) {
        if (foe.attributes.contains_text('FREE')) {
            m_new()
                .m_skill($skill[Curse of Weaksauce])
                .m_skill($skill[Sing Along])
                .m_skill($skill[Saucegeyser])
                .m_repeat_submit();
        } else if (my_familiar() == $familiar[Frumious Bandersnatch]
                && have_effect($effect[Ode to Booze]) > 0
                && get_property_int("_banderRunaways") < my_familiar_weight() / 5) {
            int banderRunaways = get_property_int("_banderRunaways");
            runaway();
            if (get_property_int("_banderRunaways") == banderRunaways) {
                print("WARNING: Mafia is not tracking bander runaways correctly.");
                set_property_int("_banderRunaways", banderRunaways + 1);
            }
        } else if (have_skill($skill[Reflex Hammer]) && get_property_int("_reflexHammerUsed") < 3) {
            use_skill(1, $skill[Reflex Hammer]);
        } else if (my_mp() >= 50 && have_skill($skill[Snokebomb]) && get_property_int("_snokebombUsed") < 3) {
            use_skill(1, $skill[Snokebomb]);
        } else {
            // non-free, whatever
            runaway();
        }
    } else if (mode == MODE_KILL) {
        m_new().m_kill().m_submit();
    } else {
        abort("Unrecognized mode.");
    }

    multi_fight();
}

void saber_yr() {
    if (!handling_choice()) abort('No choice?');
    if (last_choice() == 1387 && count(available_choice_options()) > 0) {
        run_choice(3);
    }
}

void adventure_macro(location loc, buffer macro) {
    set_hccs_combat_mode(MODE_CUSTOM, macro);
    adv1(loc, -1, "");
    set_hccs_combat_mode(MODE_NULL, '');
}

void adventure_kill(location loc) {
    adventure_macro(loc, m_new().m_kill());
}

void find_monster_then(location loc, monster foe, buffer macro) {
    set_hccs_combat_mode(MODE_FIND_MONSTER_THEN, foe.id, macro);
    set_property("_hccsCombatFound", "false");
    while (get_property("_hccsCombatFound") != "true") {
        adv1(loc, -1, "");
    }
    set_hccs_combat_mode(MODE_NULL, '');
}

void find_monster_saber_yr(location loc, monster foe) {
    set_property("choiceAdventure1387", "3");
    find_monster_then(loc, foe, m_new().m_skill($skill[Use the Force]));
}

void adventure_copy(location loc, monster foe) {
    set_hccs_combat_mode(MODE_CUSTOM,
        m_new()
            .m_if(`!monstername "{foe.name}"`, "abort")
            .m_skill($skill[Lecture on Relativity])
            .m_kill());
    adv1(loc, -1, "");
    set_hccs_combat_mode(MODE_NULL, '');
}

void adventure_run_unless_free(location loc) {
    set_hccs_combat_mode(MODE_RUN_UNLESS_FREE);
    adv1(loc, -1, "");
    set_hccs_combat_mode(MODE_NULL);
}

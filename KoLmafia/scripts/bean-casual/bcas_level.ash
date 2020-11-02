import <bcas_lib.ash>
import <bcas_combat.ash>

void level_mood() {
    if (my_mp() < 200) {
        eat(1, $item[magical sausage]);
    }

    // Stats.
    try_ensure_song($skill[Stevedave's Shanty of Superiority]);
    try_ensure_skill($skill[Song of Bravado]);
    try_ensure_skill($skill[Get Big]);
    ensure_effect($effect[Having a Ball!]);
    ensure_effect($effect[Tomato Power]);
    ensure_effect($effect[Trivia Master]);
    ensure_effect($effect[Gr8ness]);
    try_ensure_effect($effect[Favored by Lyle]);
    try_ensure_effect($effect[Starry-Eyed]);
    try_ensure_skill($skill[CHEAT CODE: Triple Size]);
    try_ensure_effect($effect[You Learned Something Maybe!]);
    if (get_property_boolean("_daycareToday") && !get_property_boolean("_daycareSpa")) cli_execute(`daycare {my_primestat()}`);

    if (my_mp() < 200) {
        eat(1, $item[magical sausage]);
    }
    if (my_primestat() == $stat[Muscle]) {
        try_ensure_song($skill[The Power Ballad of the Arrowsmith]);
        try_ensure_effect($effect[Lack of Body-Building]);
        ensure_effect($effect[Go Get 'Em, Tiger!]);
        ensure_effect($effect[Phorcefullness]);
        ensure_effect($effect[Incredibly Hulking]);
    } else if (my_primestat() == $stat[Mysticality]) {
        try_ensure_song($skill[The Magical Mojomuscular Melody]);
        try_ensure_effect($effect[We're All Made of Starfish]);
        try_ensure_skill($skill[Inscrutable Gaze]);
        ensure_effect($effect[Glittering Eyelashes]);
        ensure_effect($effect[Mystically Oiled]);
        ensure_effect($effect[On The Shoulders Of Giants]);
    } else if (my_primestat() == $stat[Moxie]) {
        try_ensure_song($skill[The Moxious Madrigal]);
        try_ensure_effect($effect[Pomp & Circumsands]);
        ensure_effect($effect[Butt-Rock Hair]);
        ensure_effect($effect[Superhuman Sarcasm]);
        ensure_effect($effect[Cock of the Walk]);
    }

    if (my_mp() < 200) {
        eat(1, $item[magical sausage]);
    }

    // ML.
    try_ensure_song($skill[Ur-Kel's Aria of Annoyance]);
    try_ensure_skill($skill[Pride of the Puffin]);
    try_ensure_skill($skill[Drescher's Annoying Noise]);

    // Combat.
    try_ensure_skill($skill[Carol of the Hells]);
    ensure_effect($effect[Pisces in the Skyces]);

    // Misc.
    try_ensure_song($skill[The Polka of Plenty]);
    try_ensure_song($skill[Singer's Faithful Ocelot]);
    try_ensure_skill($skill[Blood Bond]);
    try_ensure_skill($skill[Empathy of the Newt]);
    try_ensure_skill($skill[Leash of Linguini]);
    try_ensure_skill($skill[Carol of the Thrills]);
}

void bcas_level() {
    if (my_level() >= 13) return;

    // Put on some basic gear.
    maximize("mp", false);
    if (my_mp() < 200 && available_amount($item[magical sausage]) + available_amount($item[magical sausage casing]) > 0) {
        eat(1, $item[magical sausage]);
    }

    // Start buffing. XP buffs first.
    ensure_effect($effect[Thaumodynamic]);
    if (my_primestat() == $stat[Muscle]) {
        ensure_effect($effect[Muscle Unbound]);
        ensure_effect($effect[Purpose]);
        try_synthesize($effect[Synthesis: Movement]);
    } else if (my_primestat() == $stat[Mysticality]) {
        ensure_effect($effect[Thaumodynamic]);
        ensure_effect($effect[Category]);
        try_synthesize($effect[Synthesis: Learning]);
    } else if (my_primestat() == $stat[Moxie]) {
        ensure_effect($effect[So Fresh and So Clean]);
        ensure_effect($effect[Perception]);
        try_synthesize($effect[Synthesis: Style]);
    }

    // Campsite
    if (have_effect($effect[That's Just Cloud-Talk, Man]) == 0) {
        visit_url("place.php?whichplace=campaway&action=campaway_sky");
    }

    // Daycare
    if (get_property_int("_daycareGymScavenges") == 0) {
        // Free scavenge.
        visit_url("choice.php?whichchoice=1336&option=2");
    }

    // Bastille first.
    if (get_property_int("_bastilleGames") == 0) {
        if (available_amount($item[Bastille Battalion control rig]) == 0) {
            use(1, $item[Bastille Battalion control rig loaner voucher]);
        }
        cli_execute(`bastille {my_primestat() == $stat[Mysticality] ? "myst" : my_primestat()}`);
    }

    // Chateau rests.
    if (get_property_boolean("chateauAvailable")) {
        buy(1, $item[ceiling fan]);
        if (my_primestat() == $stat[Muscle]) {
            buy(1, $item[electric muscle stimulator]);
        } else if (my_primestat() == $stat[Mysticality]) {
            buy(1, $item[foreign language tapes]);
        } else if (my_primestat() == $stat[Moxie]) {
            buy(1, $item[bowl of potpourri]);
        }
        // Chateau rest
        while (get_property_int("timesRested") < total_free_rests()) {
            visit_url("place.php?whichplace=chateau&action=chateau_restbox");
        }
    }

    cli_execute("breakfast");

    if (have_familiar($familiar[God Lobster])) {
        use_familiar($familiar[God Lobster]);
        boolean use_gg = have_skill($skill[Giant Growth]) && mall_price($item[green mana]) < 8000;

        while (get_property('_godLobsterFights') < 3) {
            maximize_cached("mainstat, 4exp, equip makeshift garbage shirt");
            // Get stats from the fight.
            set_choice(1310, 3);
            level_mood();
            restore_hp(my_maxhp());
            if (use_gg && have_effect($effect[Giant Growth]) == 0) retrieve_item(1, $item[green mana]);
            visit_url('main.php?fightgodlobster=1');
            set_hccs_combat_mode(MODE_CUSTOM,
                m_new()
                    .m_external_if(use_gg && have_effect($effect[Giant Growth]) == 0, "skill Giant Growth")
                    .m_kill()
            );
            run_combat();
            visit_url('choice.php');
            if (handling_choice()) run_choice(3);
            set_hccs_combat_mode(MODE_NULL);
        }
    }

    if (get_property_int('_sausageFights') == 0
            && have_familiar($familiar[Pocket Professor])
            && available_amount($item[Kramco Sausage-o-Matic&trade;]) > 0) {
        use_familiar($familiar[Pocket Professor]);
        maximize_cached("mainstat, 4exp, equip makeshift garbage shirt, equip Pocket Professor memory chip, equip Kramco");
        level_mood();
        adventure_copy($location[The Outskirts of Cobb's Knob], $monster[sausage goblin]);
   }

    while (get_property_int('_neverendingPartyFreeTurns') < 10) {
        if (!get_property_boolean("leafletCompleted") && my_level() >= 9) {
            visit_url("council.php");
            cli_execute("leaflet");
        }
        use_familiar($familiar[Hovering Sombrero]);
        maximize_cached("mainstat, 4exp, equip makeshift garbage shirt");
        set_choice(1324, 5);
        level_mood();
        adventure_kill($location[The Neverending Party]);
    }

    visit_url("council.php");

    print("");
    print("Done leveling.", "blue");
    print(`Reached mainstat {my_basestat(my_primestat())}`);
}
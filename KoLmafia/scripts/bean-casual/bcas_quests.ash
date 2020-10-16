import <canadv.ash>
import <bcas_lib.ash>

void mood_baseline() {
    if (my_mp() < 200) {
        eat(1, $item[magical sausage]);
    }

    // Stats.
    try_ensure_skill($skill[Get Big]);

    // Combat.
    try_ensure_skill($skill[Carol of the Hells]);

    // Elemental res.
    try_ensure_skill($skill[Elemental Saucesphere]);
    try_ensure_skill($skill[Astral Shell]);

    // Misc.
    try_ensure_song($skill[The Polka of Plenty]);
    try_ensure_song($skill[Fat Leon's Phat Loot Lyric]);
    try_ensure_skill($skill[Singer's Faithful Ocelot]);
    try_ensure_skill($skill[Blood Bond]);
    try_ensure_skill($skill[Empathy of the Newt]);
    try_ensure_skill($skill[Leash of Linguini]);
    try_ensure_skill($skill[Carol of the Thrills]);
}

void mood_noncombat() {
    mood_baseline();
    try_ensure_skill($skill[The Sonata of Sneakiness]);
    try_ensure_skill($skill[Smooth Movement]);
    if (get_property_boolean("horseryAvailable") && get_property("_horsery") != "dark horse") cli_execute("horsery dark");
}

void bcas_billiards() {
    if (!can_adv($location[The Haunted Kitchen])) {
        use(1, $item[telegram from Lady Spookyraven]);
    }

    while (available_amount($item[Spookyraven billiards room key]) == 0) {
        use_familiar($familiar[Exotic Parrot]);
        mood_baseline();
        maximize_cached("hot res 9 min, stench res 9 min, equip Kramco");
        adventure_macro($location[The Haunted Kitchen], m_new().m_skill($skill[Saucestorm]));
    }

    while (available_amount($item[[7302]Spookyraven library key]) == 0) {
        while (my_inebriety() < 5 && available_amount($item[astral pilsner]) > 0) {
            try_ensure_song($skill[The Ode to Booze]);
            drink(1, $item[astral pilsner]);
        }

        ensure_effect($effect[Chalky Hand]);

        if (my_inebriety() + 13 < 18) abort("Couldn't get enough pool skill.");

        set_choice(875, 1); // Welcome to our Ool Table
        set_choice(1436, 2); // Maps
        use_familiar($familiar[Disgeist]);
        mood_noncombat();
        maximize_cached("-combat");
        adventure_macro($location[The Haunted Billiards Room], m_new().m_skill($skill[Saucestorm]));
    }
}

void bcas_war() {
    retrieve_item(1, $item[skeletal skiff]);
    retrieve_item(1, $item[beer helmet]);
    retrieve_item(1, $item[distressed denim pants]);
    retrieve_item(1, $item[bejeweled pledge pin]);

    while (get_property("warProgress") == "unstarted") {
        set_choice(142, 3); // Lookout Tower
        set_choice(1433, 3); // Maps
        use_familiar($familiar[Disgeist]);
        mood_noncombat();
        maximize_cached("-combat, outfit Frat Warrior Fatigues");
        adventure_run_unless_free($location[Hippy Camp]);
    }

    if (get_property_int("hippiesDefeated") < 1000) {
        int count = clamp((1000 - get_property_int("hippiesDefeated")) / 46, 0, 24);
        retrieve_item(count, $item[stuffing fluffer]);
        use(count, $item[stuffing fluffer]);
        while (get_property_int("hippiesDefeated") < 1000) {
            retrieve_item(count, $item[stuffing fluffer]);
            use(count, $item[stuffing fluffer]);
        }
    }

    if (get_property("warProgress") != "finished") {
        mood_baseline();
        maximize_cached("outfit Frat Warrior Fatigues");
        set_hccs_combat_mode(MODE_KILL);
        visit_url("bigisland.php?place=camp&whichcamp=1");
        visit_url("bigisland.php?action=bossfight");
        run_combat();
        set_hccs_combat_mode(MODE_NULL);
    }
}

void bcas_daily_dungeon() {
    while (available_amount($item[fat loot token]) < 2 && !get_property_boolean("dailyDungeonDone")) {
        if (available_amount($item[fat loot token]) == 0) {
            ensure_item(1, $item[daily dungeon malware], 40000);
        }
        set_choice(690, 2); // Chest 5
        set_choice(691, 2); // Chest 10
        set_choice(692, 11); // Lockpicks
        set_choice(693, 2); // Eleven-foot pole
        mood_baseline();
        maximize_cached("equip Ring of Detect Boring Doors");
        adventure_macro($location[The Daily Dungeon], m_new().m_item($item[daily dungeon malware]).m_skill($skill[Saucestorm]));
    }
}

void bcas_ores() {
    if (!can_adv($location[Lair of the Ninja Snowmen])) {
        visit_url("place.php?whichplace=mclargehuge&action=trappercabin");
        retrieve_item(3, get_property("trapperOre").to_item());
        retrieve_item(3, $item[goat cheese]);
        visit_url("place.php?whichplace=mclargehuge&action=trappercabin");
    }
}

void bcas_bridge() {
    if (get_property_int("chasmBridgeProgress") < 30) {
        int count = (34 - get_property_int("chasmBridgeProgress")) / 5;
        ensure_item(count, $item[smut orc keepsake box], 20000);
        use(count, $item[smut orc keepsake box]);
        visit_url(`place.php?whichplace=orc_chasm&action=bridge{get_property("chasmBridgeProgress")}`);
    }
}

void bcas_aboo() {
    int theoretical_progress = get_property_int("booPeakProgress") - 30 * item_amount($item[A-Boo Clue]);
    while (theoretical_progress > 0) {
        // while blasts through intro adventure here...
        retrieve_item(1, $item[ten-leaf clover]);
        set_property("cloverProtectActive", "false");
        adv1($location[A-Boo Peak], -1, "");
        set_property("cloverProtectActive", "true");
        theoretical_progress = get_property_int("booPeakProgress") - 30 * item_amount($item[A-Boo Clue]);
    }
}

void bcas_black_forest() {
    while (get_step("questL11Black") < 2) {
        set_choice(924, 1);
        use_familiar($familiar[Reassembled Blackbird]);
        mood_baseline();
        maximize_cached("0.1 combat rate 5 min, equip blackberry galoshes");
        adventure_kill($location[The Black Forest]);
    }

    if (get_step("questL11Black") < 3) {
        retrieve_item(1, $item[forged identification documents]);
        adv1($location[The Shore, Inc. Travel Agency], -1, "");
    }
}

void bcas_shen() {
    if (get_step("questL11Shen") < 1) {
        maximize_cached("");
        adventure_run_unless_free($location[The Copperhead Club]);
    }
}
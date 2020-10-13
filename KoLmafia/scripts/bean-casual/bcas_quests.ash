import <canadv.ash>
import <bcas_lib.ash>

void mood_baseline() {
    if (my_mp() < 0.5 * my_maxmp() && my_mp() < 200) {
        eat(1, $item[magical sausage]);
    }

    // Stats.
    try_ensure_skill($skill[Get Big]);

    // Combat.
    try_ensure_skill($effect[Carol of the Hells]);

    // Elemental res.
    try_ensure_skill($effect[Elemental Saucesphere]);
    try_ensure_skill($effect[Astral Shell]);

    // Misc.
    try_ensure_song($skill[The Polka of Plenty]);
    try_ensure_song($skill[Fat Leon's Phat Loot Lyric])
    try_ensure_skill($skill[Singer's Faithful Ocelot]);
    try_ensure_skill($skill[Blood Bond]);
    try_ensure_skill($skill[Empathy]);
    try_ensure_skill($skill[Leash of Linguini]);
    try_ensure_skill($skill[Carol of the Thrills]);
}

void mood_noncombat() {
    mood_baseline();
    try_ensure_skill($skill[The Sonata of Sneakiness]);
    try_ensure_skill($skill[Smooth Movements]);
    if (get_property("_horsery") != "dark") cli_execute("horsery dark");
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

    while (available_amount($item[Spookyraven library key]) == 0) {
        set_choice(875, 1); // Welcome to our Ool Table
        set_choice(1436, 2); // Maps
        use_familiar($familiar[Disgeist]);
        mood_noncombat();
        maximize_cached("-combat");
        adventure_macro($location[The Haunted Kitchen], m_new().m_skill($skill[Saucestorm]));
    }
}

void bcas_war() {
    if (get_property("warProgress") == "unstarted") {
        set_choice(142, 3); // Lookout Tower
        set_choice(1433, 3); // Maps
        use_familiar($familiar[Disgeist]);
        mood_noncombat();
        maximize_cached("-combat, equip Frat Warrior Fatigues");
        adventure_run_unless_free($location[Hippy Camp (Verge of War)]);
    }
}

void bcas_daily_dungeon() {
    while (available_amount($item[fat loot token]) < 2) {
        set_choice(690, 2); // Chest 5
        set_choice(691, 2); // Chest 10
        set_choice(692, 11); // Lockpicks
        set_choice(693, 3); // Eleven-foot pole
        mood_baseline();
        maximize_cached("equip Ring of Detect Boring Doors");
        adventure_macro($location[The Daily Dungeon], m_new().m_skill($skill[Saucestorm]));
    }
}

void bcas_ores() {
    if (!can_adv($location[Lair of the Ninja Snowmen])) {
        visit_url("place.php?whichplace=mclargehuge&action=trappercabin");
        retrieve_item(3, get_property("trapperOre").to_item());
    }
}

void bcas_shen() {
    if (get_property("questL11Shen") == "unstarted") {
        maximize_cached("");
        adventure_run_unless_free($location[The Copperhead Club]);
    }
}
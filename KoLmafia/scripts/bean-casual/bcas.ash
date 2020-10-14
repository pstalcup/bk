import <bcas_lib.ash>
import <bcas_intro.ash>
import <bcas_level.ash>
import <bcas_quests.ash>

set_property("bcas_objective", "");

foreach i, line in file_to_buffer("scripts/bean-casual/pulls.txt").split_string("\n") {
    cli_execute(`acquire {line}`);
}

bcas_intro();
bcas_level();

if (my_level() < 13) abort("Something went wrong in leveling!");

print("Refreshing council quests...");
visit_url("council.php");

bcas_billiards();

if (get_property_int("chasmBridgeProgress") < 30) {
    int count = (34 - get_property_int("chasmBridgeProgress")) / 5;
    ensure_item(count, $item[smut orc keepsake box], 20000);
    use(count, $item[smut orc keepsake box]);
    visit_url(`place.php?whichplace=orc_chasm&action=bridge{get_property("chasmBridgeProgress")}`);
}

cli_execute("hobodiet");

bcas_war();
bcas_daily_dungeon();
bcas_ores();
bcas_black_forest();
bcas_shen();

cli_execute("autoscend");
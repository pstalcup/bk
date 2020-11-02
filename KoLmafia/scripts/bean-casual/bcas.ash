import <bcas_lib.ash>
import <bcas_intro.ash>
import <bcas_level.ash>
import <bcas_quests.ash>

set_property("bcas_objective", "");
string diet_script = get_property("bcas_diet"); 

bcas_intro();
bcas_level();

print("Refreshing council quests...");
visit_url("council.php");

if (my_level() < 13) abort("Something went wrong in leveling!");

if (get_property("bcas_lastStockedUp").to_int() < my_ascensions()) {
    foreach i, line in file_to_buffer("scripts/bean-casual/pulls.txt").split_string("\n") {
        print(`acquire {line}`);
        if (line.length() == 0) continue;
        cli_execute(`acquire {line}`);
    }
    set_property("bcas_lastStockedUp", my_ascensions());
}

bcas_billiards();

if (my_inebriety() <= 5 && my_fullness() <= 0) {
    if (diet_script == "") {
        abort("Set property \"bcas_diet\" with your diet script, or consume your diet and rerun."); 
    }
    cli_execute(diet_script);
}

bcas_war();
bcas_daily_dungeon();
bcas_ores();
bcas_bridge();
bcas_aboo();
bcas_black_forest();
bcas_shen();

set_property("auto_abooclover", "true");

cli_execute("autoscend");

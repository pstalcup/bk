import <bcas_lib.ash>
import <bcas_intro.ash>
import <bcas_level.ash>
import <bcas_quests.ash>

set_property("bcas_objective", "");

bcas_intro();
bcas_level();
bcas_billiards();

cli_execute("hobodiet");

bcas_war();
bcas_daily_dungeon();
bcas_ores();

cli_execute("autoscend");

// If autoscend hasn't figured out to start shen, start shen.
if (get_property("questL11Shen") == "unstarted") {
    bcas_shen();
    cli_execute("autoscend");
}
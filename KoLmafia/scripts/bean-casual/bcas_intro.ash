void bcas_intro() {
    set_clan("Bonus Adventures from Hell");
    if (get_property_int('_clanFortuneConsultUses') < 3) {
        while (get_property_int('_clanFortuneConsultUses') < 3) {
            cli_execute('fortune cheesefax');
            cli_execute('wait 5');
        }
    }

    // Chateau juice bar
    visit_url('place.php?whichplace=chateau&action=chateau_desk2');

    // Sell pork gems
    visit_url('tutorial.php?action=toot');
    try_use(1, $item[letter from King Ralph XI]);
    try_use(1, $item[pork elf goodies sack]);

    try_use(1, $item[astral six-pack]);

    // Buy antique accordion
    ensure_item(1, $item[antique accordion], 2500);

    // Initialize council.
    visit_url('council.php');

    // All combat handled by our consult script (bcas_combat.ash).
    cli_execute('ccs bean-casual');

    // Upgrade saber for fam wt
    if (available_amount($item[Fourth of May Cosplay Saber]) > 0) {
        visit_url('main.php?action=may4');
        run_choice(4);
    }

    if (get_property('boomBoxSong') != 'Food Vibrations') {
        cli_execute('boombox food');
    }

    set_property('hpAutoRecovery', '0.8');
    set_property('hpAutoRecovery', '0.3');
}
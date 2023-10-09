//part 3 difficultyLvl view
exports.selectedDifficultyOption = function (difficultyLvl) {
    const titles = [
        'Very Easy',
        'Easy',
        'Medium(Standard 3x3)',
        'Intermediate',
        'Expert',
        'Hardcore',
    ];
    const options = titles.map((title, index) => ({
        title: `${index + 1} - ${title}`,
        value: index + 1,
        selected: +difficultyLvl === index + 1
    }));
    return options;
};
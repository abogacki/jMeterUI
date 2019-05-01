const groupData = testData => {
  const labelTypes = [];
  let groupedData = {};

  testData.forEach(row => {
    const fixedLabel = row.label.replace(/-.*/, "").trim();
    if (!labelTypes.includes(fixedLabel)) {
      labelTypes.push(fixedLabel);
      groupedData[fixedLabel] = [];
    }
    groupedData[fixedLabel].push({ ...row, groupLabel: fixedLabel });
  });
  return groupedData;
};

export default groupData;

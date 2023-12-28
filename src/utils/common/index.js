export const downloadCSV = (data, filename) => {
    const url = URL.createObjectURL(new Blob([data], { type: `text/csv` }));
    const a = document.createElement('a')
    a.href = url;
    a.setAttribute('download', `${filename}_${Date.now()}.csv`)
    a.click()
}


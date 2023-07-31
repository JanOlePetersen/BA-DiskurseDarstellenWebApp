/**
 * Marks items depending on search
 * @param item : String
 * @param search
 * @returns {string}
 */
function getMarkedText(item, search) {
    let finalText = "";
    let finalTextSplit = '';
    let searchExceptEmptyLast;
    let overlap = 0;

    // remove last search item if it is empty; when ' ' it returns empty due to continuous search on @:keyup
    console.log(search)
    if (search.at(search.length -1) === '') {
        searchExceptEmptyLast = search.length -1;
        overlap++;
    } else searchExceptEmptyLast = search.length;

    const splitText = item.replaceAll('<span class="marked fw-semibold">' , '')
        .replaceAll('</span>', '').split(' ');

    // if there is no search yet
    if (search.at(0) === "") {
        for (let j = 0; j < splitText.length; j++) {
            // remove all inner html which mark the text
            finalText += splitText.at(j) + ' ';
        }
        return finalText + "_" + overlap
    }

    // iterate through text (j) and searched words (i) to check for overlap
    for (let j = 0; j < splitText.length; j++) {
        for (let i = 0; i < searchExceptEmptyLast; i++) {
            // if text contains searched word mark text
            if (splitText.at(j).toLowerCase().indexOf(search.at(i).toLowerCase()) > -1 && splitText.at(j) !== finalText
                                    .replaceAll('<span class="marked fw-semibold">', '')
                                    .replaceAll('</span>', '').split(' ').at(j) && search.at(i) !== '') {
                finalText += '<span class="marked fw-semibold">' + splitText.at(j) + ' ' + '</span>';
                overlap++;
            }
            finalTextSplit = finalText.replaceAll('<span class="marked fw-semibold">', '')
                                    .replaceAll('</span>', '').split(' ');
            // if text doesn't contain searched word add without marking
            if (i === (searchExceptEmptyLast - 1) && finalTextSplit.at(j) === '') {
                finalText += splitText.at(j) + ' ';
            }
        }
    }
    return finalText + "_" + overlap
}

export default getMarkedText;
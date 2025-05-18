/**
* Validate footnote number
*
* @param num - Footnote number
* @returns {boolean} true if parameter is a positive
* integer, false if not
*/
const validateFootnoteNumber = function (num) {

    // check for empty string first because javascript is stupid
    if (num === "") {
        console.error(
            "Error: footnote number is an empty string",
        );
        return false;
    }

    // cast param to number and check if it is an integer
    if (!Number.isInteger(Number(num))) {
        console.error(
            "Error: footnote number",
            num,
            "is not an integer",
        );
        return false;
    }

    // return false if parameter is less than 1
    if (num < 1) {
        console.error(
            "Error: footnote number",
            num,
            "is too small (it must be at least 1)",
        );

        return false;
    }

    // no tests failed
    return true;

};

export default validateFootnoteNumber;

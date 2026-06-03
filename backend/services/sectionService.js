function extractSection(text){

    const lines =
        text.split("\n");

    for(const line of lines){

        if(
            line.length > 5 &&
            line.length < 100
        ){

            return line.trim();
        }
    }

    return "Unknown Section";
}

module.exports =
extractSection;
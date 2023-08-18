function ellipsis(html, length) {
    if (!html) {
        return "";
    }

    const cleanText = html.replace(/<\/?[^>]+(>|$)/g, "");
    var words = cleanText.split(" ");
    length = length || 8;
    if (words.length <= length) {
        return cleanText;
    }

    const str = words.slice(0, length || 10).join(" ");
    return str + "...";
}

export default ellipsis;
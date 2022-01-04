
export interface TableOfContents {
    level: number;
    title: string;
    element: string;
}

const hTagRegex = /<h(?<hNumber>[2-6])(.*?|(?:.*?id="(?<id>.*?)"))>(?<content>.*?)<\/h[2-6]>/gs;
// eslint-disable-next-line max-len
const anchorHTML = (path: string, id: string) => `<a href="${path}#${id}" class="heading-anchor-button"><i aria-hidden="true" role="presentation" class="heading-anchor-icon material-icons notranslate">insert_link</i></a>`;

function findHTags(html: string): RegExpMatchArray[] {
    return [...html.matchAll(hTagRegex)];
}

function generateId(title: string) {
    return title.toLowerCase().replace(/[ !”“"#$%&()*+,-./:;<=>?@[\]^_`{|}~]+/g, '-').replace(/['’]+/, '').replace(/^-+/, '')
        .replace(/-*$/, '');
}

function tocFromHTML(html: string) {
    const matches = findHTags(html);

    const toc: TableOfContents[] = [];
    matches.forEach((match) => {
        if (match.groups) {
            const level = Number(match.groups.hNumber) - 2; // Assume lowest level is h2
            const title: string = match.groups.content.replace('&nbsp;', '').replace(/<\/?[^>]+(>|$)/g, '').trim() ?? '';
            const element: string = match.groups.id ?? generateId(title);
            toc.push({ level, title, element });
        }
    });
    return toc;
}

function addAnchors(html: string, path: string): string {
    const matches = findHTags(html);
    let output = html;

    let lengthIncrease = 0;
    matches.forEach((match) => {
        if (match.index && match.groups) {
            const id = generateId(match.groups.content);
            const idInsertion = ` id = "${id}"`;

            let newHTML = '';
            const idInsertionIndex = match.index + lengthIncrease + 3;
            newHTML += output.slice(0, idInsertionIndex);
            newHTML += idInsertion;

            const anchorInsertionIndex = output.indexOf(match.groups.content);
            newHTML += output.slice(idInsertionIndex, anchorInsertionIndex);
            const anchorLink = anchorHTML(path, id);
            newHTML += anchorLink;
            newHTML += output.slice(anchorInsertionIndex);

            lengthIncrease += newHTML.length - output.length;
            output = newHTML;
        }
    });

    return output;
}

export default {
    tocFromHTML, addAnchors,
};

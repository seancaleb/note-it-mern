export default function formatName(name: string) {
    let partialNames = name.split(' ');
    partialNames = partialNames.map((name) => {
        const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
        return formattedName;
    });

    return partialNames.join(' ');
}

export const encodeBase64 = async (url: string): Promise<string> => {
    let response = "";

    try {
        response = await fetch(url, {
            cache: "force-cache",
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`not ok: ${res}`, { cause: res });
                }

                return res.blob();
            })
            .then(async (blob) => {
                const buffer = Buffer.from(await blob.arrayBuffer()) as Buffer;
                return buffer.toString("base64");
            });
    } catch (e) {
        console.log(e);
    }

    return response;
};

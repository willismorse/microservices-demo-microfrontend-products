export interface CatalogEntry {

    id: string;
    name: string;
    description: string;
    imageURL: URL[];
    price: number;
    count: number;
    tag: string[];
}

export interface CatalogData {
    catalogEntries: CatalogEntry[];
}


// TODO: Collapse these error types into an enum in a single Failure class.
// Making these actual classes is kind of overblown. I'd prefer to use interfaces over classes, but you can't
// do instanceof on interfaces in TS so there's no way to do type narrowing at runtime in our error handling code.
// So we might as well just jam this all into an FailureType enum
export class Failure {
    message: string;
    reason: {} | undefined;
}

export class NetworkFailure implements Failure {
    reason: {} | undefined;
    message: string;

    constructor(reason: {} | undefined = undefined) {
        this.reason = reason;
    }
}

export class CatalogAPIAccessFailure implements Failure {
    reason: {} | undefined;
    message: string;

    constructor(reason: {} | undefined = undefined) {
        this.reason = reason;
    }
}

export class CatalogAPIFailure implements Failure {
    reason: {} | undefined;
    message: string;

    constructor(reason: {} | undefined = undefined) {
        this.reason = reason;
    }
}

export class CatalogDataFormatFailure implements Failure {
    reason: {} | undefined;
    message: string;

    constructor(reason: {} | undefined = undefined) {
        this.reason = reason;
    }
}


export class CatalogueResponse {

    catalogData: CatalogData;


    /**
     * Note that making a seperate CatalogueResponse class just to hold the (eventually received) CatalogueData is overkill.
     * I think we could just make this a top level function and return a promise on CatalogData directly. But I ran into some
     * TS quirks about assigning raw objects to interfaces/classes, and I ended up adding this additional layer as a workaround
     * TODO: make this a toplevel function that returns a promise on CatalogData directly
     *
     * @returns {Promise<CatalogueResponse>}
     */
    static loadCatalogueData(): Promise<CatalogueResponse> {
        return new Promise<CatalogueResponse>((resolve, reject) => {
            let url = `http://192.168.1.100/catalogue/`;

            // Note that unlike pretty much every other Javascript network access library, fetch().catch() will only
            // be called when there's a hardcore network error.
            // If the connection is successful, fetch().then() is called, regardless of HTTP status
            fetch(url)
                .then(response => {
                    if (response.ok) {
                        response
                            .json()
                            .then(rawData => {
                                // Note that we are leveraging Javascript->Typescript sloppiness here to pass
                                // rawData:any in to WeatherData constructor, which requires a type of DarkSkyData.
                                // Since DarkSkyData is a TS interface, not a class, we can get away with this. Note, of
                                // course, that we have absolutely no guarantee that the json data will map to our
                                // interface in any way, and if it doesn't we will get all sorts of run time errors when
                                // we access it.
                                // TODO: Replace this with a proper typesafe deserialization mechanism.
                                // This way we can catch schema violations during import. See, for instance:
                                //      json2typescript - https://github.com/dhlab-basel/json2typescript
                                let catalogData = new CatalogueResponse(rawData);
                                resolve(catalogData);
                            })
                            .catch(reason => {
                                // If the JSON parsing failed, we end up here
                                reject(new CatalogDataFormatFailure(reason));
                            });
                    } else {
                        // We end up here if the response status code != 200

                        if (response.status === 403) {
                            // This generally signifies an incorrect key or other account-related problem
                            reject(new CatalogAPIAccessFailure());
                        } else {
                            // For everything else, we will just use a generic failure
                            reject(new CatalogAPIFailure());
                        }
                    }
                })
                .catch(reason => {
                    // We only end up here if there's a hardcode networking error (like no connection
                    // or timeout or something)
                    reject(new NetworkFailure(reason));
                });
        });
    }

    constructor(catalogData: CatalogData) {
        this.catalogData = catalogData;
    }

}
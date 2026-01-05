# Greenbook Backend

<table>
    <thead>
        <tr>
            <th>Page Name</th>
            <th>Route</th>
            <th>Visibility</th>
            <th>HTTP Method</th>
            <th>Input</th>
            <th>Output</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Create Union</td>
            <td>/union</td>
            <td>Public</td>
            <td>POST</td>
            <td>{ unionName: string, registrationType: string, registrationNumber: string, state: string, district: string, verificationStandard: string, verificationStatus: string, projectID: string, vintageYear: number, totalVerifiedCredits: number, creditsAvailableForSale: number, creditType: string, minPricePerCredit: number, maxPricePerCredit: number, contactName: string, email: string }</td>
            <td>{ message: string }</td>
            <td>Create a new union document after ensuring registrationNumber is unique.</td>
        </tr>
        <tr>
            <td>List Unions</td>
            <td>/unions</td>
            <td>Public</td>
            <td>GET</td>
            <td>none</td>
            <td>[{ unionName: string, registrationType: string, registrationNumber: string, state: string, district: string, verificationStandard: string, verificationStatus: string, projectID: string, vintageYear: number, totalVerifiedCredits: number, creditsAvailableForSale: number, creditType: string, minPricePerCredit: number, maxPricePerCredit: number, contactName: string, email: string, _id: string, createdAt: string, updatedAt: string }]</td>
            <td>Fetch all stored unions.</td>
        </tr>
        <tr>
            <td>Get Union</td>
            <td>/unions/:id</td>
            <td>Public</td>
            <td>GET</td>
            <td>{ id: string }</td>
            <td>{ unionName: string, registrationType: string, registrationNumber: string, state: string, district: string, verificationStandard: string, verificationStatus: string, projectID: string, vintageYear: number, totalVerifiedCredits: number, creditsAvailableForSale: number, creditType: string, minPricePerCredit: number, maxPricePerCredit: number, contactName: string, email: string, _id: string, createdAt: string, updatedAt: string }</td>
            <td>Fetch a single union by MongoDB id.</td>
        </tr>
        <tr>
            <td>Update Union</td>
            <td>/update/union/:id</td>
            <td>Public</td>
            <td>PUT</td>
            <td>{ id: string, body: { unionName?: string, registrationType?: string, registrationNumber?: string, state?: string, district?: string, verificationStandard?: string, verificationStatus?: string, projectID?: string, vintageYear?: number, totalVerifiedCredits?: number, creditsAvailableForSale?: number, creditType?: string, minPricePerCredit?: number, maxPricePerCredit?: number, contactName?: string, email?: string } }</td>
            <td>{ unionName: string, registrationType: string, registrationNumber: string, state: string, district: string, verificationStandard: string, verificationStatus: string, projectID: string, vintageYear: number, totalVerifiedCredits: number, creditsAvailableForSale: number, creditType: string, minPricePerCredit: number, maxPricePerCredit: number, contactName: string, email: string, _id: string, createdAt: string, updatedAt: string }</td>
            <td>Update an existing union by MongoDB id and return the updated document.</td>
        </tr>
        <tr>
            <td>Delete Union</td>
            <td>/delete/union/:id</td>
            <td>Public</td>
            <td>DELETE</td>
            <td>{ id: string }</td>
            <td>{ message: string }</td>
            <td>Delete a union by MongoDB id.</td>
        </tr>
    </tbody>
</table>

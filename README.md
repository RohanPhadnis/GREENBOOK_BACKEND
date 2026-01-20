# Greenbook Backend

## API Design
<table>
    <thead>
        <tr>
            <th>Page Name</th>
            <th>Route</th>
            <th>Visibility</th>
            <th>HTTP Method</th>
            <th>Input</th>
            <th>Output</th>
            <th>Error Codes</th>
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
            <td></td>
            <td>Create a new union document after ensuring registrationNumber is unique.</td>
        </tr>
        <tr>
            <td>List Unions</td>
            <td>/unions</td>
            <td>Public</td>
            <td>GET</td>
            <td>none</td>
            <td>[{ unionName: string, registrationType: string, registrationNumber: string, state: string, district: string, verificationStandard: string, verificationStatus: string, projectID: string, vintageYear: number, totalVerifiedCredits: number, creditsAvailableForSale: number, creditType: string, minPricePerCredit: number, maxPricePerCredit: number, contactName: string, email: string, _id: string, createdAt: string, updatedAt: string }]</td>
            <td></td>
            <td>Fetch all stored unions.</td>
        </tr>
        <tr>
            <td>Get Union</td>
            <td>/unions/:id</td>
            <td>Public</td>
            <td>GET</td>
            <td>{ id: string }</td>
            <td>{ unionName: string, registrationType: string, registrationNumber: string, state: string, district: string, verificationStandard: string, verificationStatus: string, projectID: string, vintageYear: number, totalVerifiedCredits: number, creditsAvailableForSale: number, creditType: string, minPricePerCredit: number, maxPricePerCredit: number, contactName: string, email: string, _id: string, createdAt: string, updatedAt: string }</td>
            <td></td>
            <td>Fetch a single union by MongoDB id.</td>
        </tr>
        <tr>
            <td>Update Union</td>
            <td>/update/union/:id</td>
            <td>Public</td>
            <td>PUT</td>
            <td>{ id: string, body: { unionName?: string, registrationType?: string, registrationNumber?: string, state?: string, district?: string, verificationStandard?: string, verificationStatus?: string, projectID?: string, vintageYear?: number, totalVerifiedCredits?: number, creditsAvailableForSale?: number, creditType?: string, minPricePerCredit?: number, maxPricePerCredit?: number, contactName?: string, email?: string } }</td>
            <td>{ unionName: string, registrationType: string, registrationNumber: string, state: string, district: string, verificationStandard: string, verificationStatus: string, projectID: string, vintageYear: number, totalVerifiedCredits: number, creditsAvailableForSale: number, creditType: string, minPricePerCredit: number, maxPricePerCredit: number, contactName: string, email: string, _id: string, createdAt: string, updatedAt: string }</td>
            <td></td>
            <td>Update an existing union by MongoDB id and return the updated document.</td>
        </tr>
        <tr>
            <td>Delete Union</td>
            <td>/delete/union/:id</td>
            <td>Public</td>
            <td>DELETE</td>
            <td>{ id: string }</td>
            <td>{ message: string }</td>
            <td></td>
            <td>Delete a union by MongoDB id.</td>
        </tr>
        <tr>
            <td>Register</td>
            <td>/user</td>
            <td>Public</td>
            <td>POST</td>
            <td>{ name: string, email: string, password: string, type: enum[CORPORTATE, FARMER] }</td>
            <td> {sessionId: string} </td>
            <td> {200: "success", 400: "missing fields", 409: "email already registered", 500: "internal server error"} </td>
            <td>Registers a user.</td>
        </tr>
        <tr>
            <td>Login</td>
            <td>/session</td>
            <td>Public</td>
            <td>POST</td>
            <td>{ email: string, password: string }</td>
            <td>{ sessionId: string }</td>
            <td> {200: "success", 400: "missing fields", 401: "incorrect email or password", 500: "internal server error"} </td>
            <td>Login for a user.</td>
        </tr>
        <tr>
            <td>Dashboard</td>
            <td>/dashboard</td>
            <td>Private</td>
            <td>POST</td>
            <td>{email:string, sessionId:string}</td>
            <td>None</td>
            <td> {200: "success", 401: "unauthorized", 500: "internal server error"} </td>
            <td>Retrieves information for dashboard.</td>
        </tr>
        <tr>
            <td>Farmer Dashboard</td>
            <td>/farmer_dashboard</td>
            <td>Private</td>
            <td>POST</td>
            <td>{email:string, sessionId:string}</td>
            <td>None</td>
            <td></td>
            <td>Retrieves information for farmer dashboard.</td>
        </tr>
        <tr>
            <td>Corportate Dashboard</td>
            <td>/corportatd_dashboard</td>
            <td>Private</td>
            <td>POST</td>
            <td>{email:string, sessionId:string}</td>
            <td>None</td>
            <td></td>
            <td>Retrieves information for corporate dashboard.</td>
        </tr>
    </tbody>
</table>


## Database Design
<table>
    <thead>
        <tr>
            <th>Table Name</th>
            <th>Schema</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Unions (MongoDB collection)</td>
            <td>{ unionName: string, registrationType: string, registrationNumber: string, state: string, district: string, verificationStandard: string, verificationStatus: string, projectID: string, vintageYear: number, totalVerifiedCredits: number, creditsAvailableForSale: number, creditType: string, minPricePerCredit: number, maxPricePerCredit: number, contactName: string, email: string, _id: string, createdAt: string, updatedAt: string }</td>
            <td>Stores union records; registrationNumber unique; enums on registrationType, verificationStandard, verificationStatus, creditType; defaults: verificationStatus "Pending", credit tallies 0, Mongo timestamps.</td>
        </tr>
        <tr>
            <td>Users</td>
            <td>{ name: string, email: string, password: string, type: enum[FAREMR, CORPORATE], farmerInfo: {}, corporateInfo: {} }</td>
            <td>Keeps track of users in the system.</td>
        </tr>
        <tr>
            <td>Session</td>
            <td>{ sessionId: string, email: string, timestamp: number }</td>
            <td>Keeps track of all active login sessions.</td>
        </tr>
    </tbody>
</table>

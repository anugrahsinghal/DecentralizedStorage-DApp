# DecentralizedStorage-DApp

### Steps for executing the Project
## Setup
1. Unzip the Project folder.
2. Install node package manager if not already installed on the system
3. Run command prompt.
4. 3cd into the project folder then into ethereum folder.
5. Run command - npm install
6. After successful completion.
7. Run command - node compile.js
8. Install MetaMask (https://metamask.io) in the browser if not already installed.
9. Use any rinkeby faucet to get test ether to your account as it is needed for deployment and testing.
10. Run command - node deploy.js
# Image Placeholder
11. An address is received as response and is to be pasted into file DecentralizedStorage.js.

## Usage
1. Run command - npm run dev

2. This launches the project on the dev server at 127.0.0.1:3000
3. Open browser, Goto - localhost:3000
# Image Placeholder
4. At the landing page click ‘Goto User’ attribute.

# Image Placeholder

# Image Placeholder

5. Use hasher.bat provided in the project folder to generate the hash of a file you want to upload. The command appends data to a file called hashes.txt from where user can pick up the generated hash.


6. Add the hash and the filename to their respective columns. And click ‘Add Data’.
7. After the transaction is successful click ‘Get Data’ to view uploaded data along with the timestamp.
8. Goto - localhost:3000
9. At the landing page click Goto Admin attribute
10. Click ‘Get Data’ to view uploaded data along with the timestamp for all users.
11. To add new user generate another account using MetaMask and repeat step 9.
12. Paste the new address in the register user field in the admin page.
Repeat Steps 4-7 to see results.

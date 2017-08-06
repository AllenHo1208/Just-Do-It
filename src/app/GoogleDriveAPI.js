var JUSTDOIT_FILENAME = 'JustDoIt.json';

var oJustDoIt = (function () {
	var sFileId;
	return {
		setFileId: function (val) {
			sFileId = val;
		},
		getFileId: function () {
			return sFileId;
		},
		save: function (jsonData, callback) {
			updateJustDoItContent(this.getFileId(), JSON.stringify(jsonData), function (oFile, sJson) {
				callback(oFile);
			});
		}
	};
})();

window.onbeforeunload = function (e) {
	/* 
	Compare the client data with the server data, if any difference, return non-null string, and ask user to click Save button manually 
	*/
	var sDialogText = 'Your latest changes have not yet saved, please SAVE them before close the page.';
	e.returnValue = sDialogText;
	return sDialogText;
};

// Client ID and API key from the Developer Console
var CLIENT_ID = 'AIzaSyAMdRyokhYrH3IYC37LJFK7xI9D9sn_iFY';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be included, separated by spaces.
var SCOPES = 'https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.appfolder https://www.googleapis.com/auth/drive.appfolder';

var authorizeButton = document.getElementById('authorize-button');
var signoutButton = document.getElementById('signout-button');

/**
 *  Initializes the API client library and sets up sign-in state listeners.
 */
function handleClientLoad(callback) {
	gapi.load('client:auth2', function () {
		gapi.client.init({
			discoveryDocs: DISCOVERY_DOCS,
			clientId: CLIENT_ID,
			scope: SCOPES
		}).then(function (response) {
			// Listen for sign-in state changes.
			gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
			// Handle the initial sign-in state.
			updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get(), callback);
			authorizeButton.onclick = handleAuthClick;
			signoutButton.onclick = handleSignoutClick;
		}, function (reason) {
			alert(JSON.stringify(reason));
		});
	});
}

function handleAuthClick(event) {
	gapi.auth2.getAuthInstance().signIn();
}

function handleSignoutClick(event) {
	gapi.auth2.getAuthInstance().signOut();
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn, callback) {
	if (isSignedIn) {
		authorizeButton.style.display = 'none';
		signoutButton.style.display = 'block';
		listAppDataFiles(function (pFiles) {
			if (pFiles) {
				if (pFiles.length === 1) {
					oJustDoIt.setFileId(pFiles[0].id);
					callback(pFiles[0]);
				} else if (pFiles.length === 0) {
					createFileWithJSONContent(JUSTDOIT_FILENAME, '', function (oFile) {
						oJustDoIt.setFileId(oFile.id);
					});
				} else {
					console.warn('More than one files called "' + JUSTDOIT_FILENAME + '".');
				}
			} else {
				createFileWithJSONContent(JUSTDOIT_FILENAME, '', function (oFile) {
					oJustDoIt.setFileId(oFile.id);
				});
			}
		});
	} else {
		authorizeButton.style.display = 'block';
		signoutButton.style.display = 'none';
	}
}

function listAppDataFiles(callback) {
	gapi.client.drive.files.list({
		'pageSize': 10,
		'fields': "nextPageToken, files(id, name)",
		'spaces': 'appDataFolder',
		'corpora': 'user',
		q: "name='" + JUSTDOIT_FILENAME + "'"
	}).then(function (response) {
		var files = response.result.files;
		if (files && files.length > 0) {
			for (var i = 0; i < files.length; i++) {
				var file = files[i];
				console.log(file.name + ' (' + file.id + ')');
			}
		} else {
			console.log('No files found.');
		}

		// execute custom callback
		callback(files);
	});
}

var createFileWithJSONContent = function (name, data, callback) {
	const boundary = '-------IAmABoundary';
	const delimiter = "\r\n--" + boundary + "\r\n";
	const close_delim = "\r\n--" + boundary + "--";

	const contentType = 'application/json';

	var metadata = {
		'name': name,
		'mimeType': contentType,
		'parents': ['appDataFolder']
	};

	var multipartRequestBody =
		delimiter +
		'Content-Type: application/json\r\n\r\n' +
		JSON.stringify(metadata) +
		delimiter +
		'Content-Type: ' + contentType + '\r\n\r\n' +
		data +
		close_delim;

	var request = gapi.client.request({
		'path': '/upload/drive/v3/files',
		'method': 'POST',
		'params': { 'uploadType': 'multipart' },
		'headers': {
			'Content-Type': 'multipart/related; boundary="' + boundary + '"'
		},
		'body': multipartRequestBody
	});
	request.execute(callback);
}

var updateJustDoItContent = function (fileId, data, callback) {
	const boundary = '-------IAmABoundary';
	const delimiter = "\r\n--" + boundary + "\r\n";
	const close_delim = "\r\n--" + boundary + "--";

	const contentType = 'application/json';

	var metadata = {
		'mimeType': contentType,
		'addParents': ['appDataFolder']
	};

	var multipartRequestBody =
		delimiter +
		'Content-Type: application/json\r\n\r\n' +
		JSON.stringify(metadata) +
		delimiter +
		'Content-Type: ' + contentType + '\r\n\r\n' +
		data +
		close_delim;

	var request = gapi.client.request({
		'path': '/upload/drive/v3/files/' + fileId,
		'method': 'PATCH',
		'params': { 'uploadType': 'multipart' },
		'headers': {
			'Content-Type': 'multipart/related; boundary="' + boundary + '"'
		},
		'body': multipartRequestBody
	});
	request.execute(callback);
}


/**
 * Print a file's metadata & content.
 *
 * @param {String} sFileId ID of the file to print metadata for.
 */
function getFileContent(sFileId, callback) {
	var request = gapi.client.drive.files.get({
		'fileId': sFileId,
		'alt': 'media' // add alt=media to include file contents in the response body
	});
	if (!callback) {
		callback = function (oFile, sJson) {
			console.info(oFile);
		}
	}
	request.execute(callback);
}

/**
 * Download a file's content.
 *
 * @param {File} file Drive File instance.
 * @param {Function} callback Function to call when the request is complete.
 */
function downloadFile(file, callback) {
	if (file.downloadUrl) {
		var accessToken = gapi.auth.getToken().access_token;
		var xhr = new XMLHttpRequest();
		xhr.open('GET', file.downloadUrl);
		xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
		xhr.onload = function () {
			callback(xhr.responseText);
		};
		xhr.onerror = function () {
			callback(null);
		};
		xhr.send();
	} else {
		callback(null);
	}
}

export default {
	handleClientLoad: handleClientLoad,
	handleAuthClick: handleAuthClick,
	handleSignoutClick: handleSignoutClick,
	updateSigninStatus: updateSigninStatus,
	listAppDataFiles: listAppDataFiles,
	createFileWithJSONContent: createFileWithJSONContent,
	updateJustDoItContent: updateJustDoItContent,
	getFileContent: getFileContent,
	save: oJustDoIt.save.bind(oJustDoIt)
};
# Audiofork Integration with Google Cloud Speech-to-Text

## Project Overview
This project demonstrates a basic integration of the Audiofork module with Google Cloud Speech-to-Text services. Audiofork is an open-source module within the Asterisk framework for audio manipulation, while Google Cloud Speech-to-Text provides cloud-based speech recognition capabilities. By combining these technologies, developers can create applications that transcribe audio from telephony systems or other sources in real-time using Google's powerful speech recognition capabilities.

## Demo Application
The demo application in this project is built using Node.js. It utilizes the Audiofork module to capture audio from a telephony source (e.g., SIP call) within an Asterisk environment. This audio is then streamed to Google Cloud Speech-to-Text service for transcription. Once transcribed, the text output is logged or displayed for further processing.

## Getting Started
To use this demo application, follow these steps:

1. **Prerequisites:**
   - Node.js installed on your machine.
   - Access to an Asterisk server with Audiofork module installed and configured.
   - A Google Cloud Platform (GCP) account with Speech-to-Text API enabled.

2. **Clone the Repository:**
   ```
   git clone <repository_url>
   ```

3. **Install Dependencies:**
   ```
   cd <project_directory>
   npm install
   ```

4. **Set up Google Cloud Credentials:**
   - Generate a service account key for your GCP project. Instructions can be found [here](https://cloud.google.com/speech-to-text/docs/quickstart-client-libraries#before-you-begin).
   - Create a `.env` file in the root directory of the project and add the following line, replacing `/path/to/your/service-account-key.json` with the path to your service account key file:
     ```
     GOOGLE_APPLICATION_CREDENTIALS=/path/to/your/service-account-key.json
     ```

5. **Run the Application:**
   ```
   node app.js
   ```

6. **Test the Application:**
   - Initiate a call to your Asterisk server or simulate audio input through another source.
   - Check the console output for transcription results from Google Cloud Speech-to-Text.

## Additional Notes
- Ensure proper network connectivity and firewall settings to allow communication between the Asterisk server and Google Cloud Speech-to-Text service.
- This demo application provides a basic integration example. Developers can extend it further to incorporate additional features or enhance error handling as per their requirements.
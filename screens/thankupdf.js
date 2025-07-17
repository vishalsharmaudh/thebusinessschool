import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from 'react-native';
import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../supabaseClient';

const sanitizeHTML = (str) =>
  String(str)
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export default function ThankYouScreen({ route }) {
  const [downloading, setDownloading] = useState(false);
  const { formData } = route.params || {};
  const navigation = useNavigation();

  const generatePDF = async () => {
    if (!formData || !sanitizeHTML) {
      Alert.alert(
        'Error',
        'Form data is missing. Please submit the form again.'
      );
      return;
    }

    // Comprehensive debugging
    console.log('=== DEBUGGING RESULT SHEET ===');
    console.log('Full formData keys:', Object.keys(formData));
    console.log('examDetails exists:', !!formData.examDetails);

    if (formData.examDetails) {
      console.log('examDetails keys:', Object.keys(formData.examDetails));
      console.log('resultSheet exists:', !!formData.examDetails.resultSheet);

      if (formData.examDetails.resultSheet) {
        console.log('resultSheet type:', typeof formData.examDetails.resultSheet);
        console.log('resultSheet keys:', Object.keys(formData.examDetails.resultSheet));
        console.log('resultSheet content:', formData.examDetails.resultSheet);
      }
    }

    // Check all possible locations for image data
    const possibleImagePaths = [
      formData.examDetails?.resultSheet?.base64,
      formData.examDetails?.resultSheet?.uri,
      formData.examDetails?.resultSheet?.data,
      formData.examDetails?.resultSheet,
      formData.resultSheet?.base64,
      formData.resultSheet?.uri,
      formData.resultSheet,
      formData.examDetails?.resultSheetImage,
      formData.examDetails?.resultSheetBase64,
    ];

    console.log('Checking possible image paths:');
    possibleImagePaths.forEach((path, index) => {
      console.log(`Path ${index}:`, typeof path, path ? `Length: ${path.length}` : 'null/undefined');
    });

    setDownloading(true);

    try {
      const styles = `
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        body {
          font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
          color: #2c3e50;
          line-height: 1.3;
          padding: 15px;
          background-color: #ffffff;
          margin: 0;
        }
        .container {
          max-width: 700px;
          margin: 0 auto;
          background-color: #ffffff;
          padding: 12px;
          border: 1px solid #d3e3f0;
          border-radius: 6px;
          page-break-inside: avoid;
        }
        .header {
          text-align: center;
          padding-bottom: 10px;
          margin-bottom: 12px;
          border-bottom: 1px solid #1a5276;
        }
        .header h1 {
          color: #1a5276;
          font-size: 22px;
          font-weight: 700;
          letter-spacing: 0.4px;
          text-transform: uppercase;
        }
        .photo-signature {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          float: right;
          max-width: 120px;
          margin-left: 10px;
        }
        .photo-signature img.photo {
          max-width: 90px;
          max-height: 100px;
          object-fit: contain;
          border: 1px solid #1a5276;
          border-radius: 4px;
          margin-bottom: 6px;
        }
        .photo-signature img.signature {
          width: 90px;
          height: 35px;
          object-fit: contain;
          border: 1px solid #1a5276;
          border-radius: 3px;
          padding: 3px;
          background-color: #f0f4f8;
        }
        .section {
          margin-bottom: 12px;
          padding: 10px;
          border-left: 3px solid #1a5276;
          border-radius: 4px;
          background-color: #f9fafc;
          page-break-inside: avoid;
        }
        .section h2 {
          color: #1a5276;
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 6px;
          border-bottom: 1px solid #d3e3f0;
          padding-bottom: 4px;
        }
        .section h3 {
          color: #2c3e50;
          font-size: 14px;
          font-weight: 600;
          margin-top: 8px;
          margin-bottom: 6px;
        }
        .field {
          display: flex;
          flex-wrap: wrap;
          margin-bottom: 6px;
          margin-right: 130px;
          align-items: baseline;
        }
        .field-label {
          font-weight: 600;
          color: #2c3e50;
          width: 160px;
          font-size: 13px;
        }
        .field-value {
          flex: 1;
          color: #333333;
          font-size: 13px;
          font-weight: 400;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 6px;
          background-color: #ffffff;
          border-radius: 4px;
          border: 1px solid #d3e3f0;
        }
        th, td {
          border: 1px solid #d3e3f0;
          padding: 8px;
          text-align: left;
          font-size: 12px;
        }
        th {
          background-color: #1a5276;
          color: #ffffff;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.2px;
        }
        tr:nth-child(even) {
          background-color: #f9fafc;
        }
        .image-placeholder {
          color: #7f8c8d;
          font-style: italic;
          font-size: 11px;
          margin-top: 6px;
        }
        .result-sheet-image {
          max-width: 250px;
          max-height: 320px;
          object-fit: contain;
          border: 1px solid #1a5276;
          border-radius: 4px;
          margin-top: 8px;
        }
        .clear {
          clear: both;
        }
        @media print {
          body {
            margin: 0;
            padding: 10mm;
          }
          .container {
            border: none;
            margin: 0;
            width: 100%;
            max-width: none;
            padding: 10px;
          }
          .section {
            page-break-inside: avoid;
          }
          .photo-signature {
            margin-right: 5px;
          }
        }
      `;

      // Enhanced result sheet image handling with comprehensive search
      let resultSheetImageHTML = '';
      let base64Image = null;

      // Search all possible locations for the image data
      const searchLocations = [
        { path: 'examDetails.resultSheet.base64', value: formData.examDetails?.resultSheet?.base64 },
        { path: 'examDetails.resultSheet.uri', value: formData.examDetails?.resultSheet?.uri },
        { path: 'examDetails.resultSheet.data', value: formData.examDetails?.resultSheet?.data },
        { path: 'examDetails.resultSheet (direct)', value: formData.examDetails?.resultSheet },
        { path: 'resultSheet.base64', value: formData.resultSheet?.base64 },
        { path: 'resultSheet.uri', value: formData.resultSheet?.uri },
        { path: 'resultSheet (direct)', value: formData.resultSheet },
        { path: 'examDetails.resultSheetImage', value: formData.examDetails?.resultSheetImage },
        { path: 'examDetails.resultSheetBase64', value: formData.examDetails?.resultSheetBase64 },
      ];

      console.log('=== SEARCHING FOR RESULT SHEET IMAGE ===');

      for (const location of searchLocations) {
        console.log(`Checking ${location.path}:`, typeof location.value, location.value ? `Length: ${location.value.length || 'N/A'}` : 'null/undefined');

        if (location.value && typeof location.value === 'string' && location.value.length > 100) {
          base64Image = location.value;
          console.log(`✅ Found image data at: ${location.path}`);
          break;
        }
      }

      if (base64Image) {
        // Clean and format the base64 data
        console.log('Processing found image data...');
        console.log('Original length:', base64Image.length);
        console.log('Starts with data:image?', base64Image.startsWith('data:image'));
        console.log('First 50 chars:', base64Image.substring(0, 50));

        // Add data URI prefix if not present
        if (!base64Image.startsWith('data:image')) {
          let imageType = 'jpeg'; // default
          if (base64Image.startsWith('iVBORw0KGgo')) {
            imageType = 'png';
          } else if (base64Image.startsWith('/9j/')) {
            imageType = 'jpeg';
          }
          base64Image = `data:image/${imageType};base64,${base64Image}`;
        }

        resultSheetImageHTML = `<img src="${sanitizeHTML(base64Image)}" alt="Result Sheet" class="result-sheet-image" />`;
        console.log('✅ Result sheet image HTML generated successfully');
        console.log('Final image src length:', base64Image.length);
      } else {
        console.log('❌ No valid image data found in any location');
        resultSheetImageHTML = '<p class="image-placeholder">[Result Sheet Not Uploaded - No valid image data found]</p>';
      }

      const htmlContent = `
        <html>
          <head>
            <meta charset="UTF-8">
            <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;600;700&display=swap" rel="stylesheet">
            <style>${styles}</style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>MBA Admission Form</h1>
              </div>
              <div class="section">
                <h2>Personal Information</h2>
                <div class="photo-signature">
                  ${formData.photograph && formData.photograph.base64
          ? `<img src="${sanitizeHTML(
            formData.photograph.base64
          )}" alt="Photograph" class="photo" />`
          : '<p class="image-placeholder">[Photograph Not Uploaded]</p>'
        }
                  ${formData.signature && formData.signature.base64
          ? `<img src="${sanitizeHTML(
            formData.signature.base64
          )}" alt="Signature" class="signature" />`
          : '<p class="image-placeholder">[Signature Not Uploaded]</p>'
        }
                </div>
                <div class="field"><span class="field-label">Applicant Name:</span><span class="field-value">${sanitizeHTML(
          formData.applicantName || ''
        )}</span></div>
                <div class="field"><span class="field-label">Gender:</span><span class="field-value">${sanitizeHTML(
          formData.gender || ''
        )}</span></div>
                <div class="field"><span class="field-label">Father's Name:</span><span class="field-value">${sanitizeHTML(
          formData.fatherName || ''
        )}</span></div>
                <div class="field"><span class="field-label">Mother's Name:</span><span class="field-value">${sanitizeHTML(
          formData.motherName || ''
        )}</span></div>
                <div class="field"><span class="field-label">Date of Birth:</span><span class="field-value">${sanitizeHTML(
          formData.dateOfBirth || ''
        )}</span></div>
                <div class="field"><span class="field-label">Annual Income:</span><span class="field-value">${sanitizeHTML(
          formData.annualIncome || ''
        )}</span></div>
                <div class="field"><span class="field-label">Correspondence Address:</span><span class="field-value">${sanitizeHTML(
          formData.correspondenceAddress || ''
        )}</span></div>
              </div>
              <div class="section">
                <h2>Contact Information</h2>
                <div class="field"><span class="field-label">Permanent Address:</span><span class="field-value">${sanitizeHTML(
          formData.permanentAddress || ''
        )}</span></div>
                <div class="field"><span class="field-label">Pin Code:</span><span class="field-value">${sanitizeHTML(
          formData.pinCode || ''
        )}</span></div>
                <div class="field"><span class="field-label">Mobile No.:</span><span class="field-value">${sanitizeHTML(
          formData.mobileNo || ''
        )}</span></div>
                <div class="field"><span class="field-label">Alternate Contact No.:</span><span class="field-value">${sanitizeHTML(
          formData.alternateContactNo || ''
        )}</span></div>
                <div class="field"><span class="field-label">Email:</span><span class="field-value">${sanitizeHTML(
          formData.email || ''
        )}</span></div>
              </div>
              <div class="section">
                <h2>School Level Education Details</h2>
                <h3>10th Details</h3>
                <div class="field"><span class="field-label">Board:</span><span class="field-value">${sanitizeHTML(
          formData.tenth?.board || ''
        )}</span></div>
                <div class="field"><span class="field-label">Year:</span><span class="field-value">${sanitizeHTML(
          formData.tenth?.year || ''
        )}</span></div>
                <div class="field"><span class="field-label">Marks Obtained:</span><span class="field-value">${sanitizeHTML(
          formData.tenth?.marks || ''
        )}</span></div>
                <div class="field"><span class="field-label">Max Marks:</span><span class="field-value">${sanitizeHTML(
          formData.tenth?.maxMarks || ''
        )}</span></div>
                <div class="field"><span class="field-label">Percentage:</span><span class="field-value">${sanitizeHTML(
          formData.tenth?.percentage || ''
        )}%</span></div>
                <h3>12th Details</h3>
                <div class="field"><span class="field-label">Board:</span><span class="field-value">${sanitizeHTML(
          formData.twelfth?.board || ''
        )}</span></div>
                <div class="field"><span class="field-label">Year:</span><span class="field-value">${sanitizeHTML(
          formData.twelfth?.year || ''
        )}</span></div>
                <div class="field"><span class="field-label">Marks Obtained:</span><span class="field-value">${sanitizeHTML(
          formData.twelfth?.marks || ''
        )}</span></div>
                <div class="field"><span class="field-label">Max Marks:</span><span class="field-value">${sanitizeHTML(
          formData.twelfth?.maxMarks || ''
        )}</span></div>
                <div class="field"><span class="field-label">Percentage:</span><span class="field-value">${sanitizeHTML(
          formData.twelfth?.percentage || ''
        )}%</span></div>
              </div>
              <div class="section">
                <h2>University Level Education Details</h2>
                <div class="field"><span class="field-label">Graduation Field:</span><span class="field-value">${sanitizeHTML(
          formData.graduation?.field || ''
        )}</span></div>
                <div class=" diverso-field"><span class="field-label">University:</span><span class="field-value">${sanitizeHTML(
          formData.graduation?.university || ''
        )}</span></div>
                <div class="field"><span class="field-label">Status:</span><span class="field-value">${sanitizeHTML(
          formData.graduation?.status || ''
        )}</span></div>
                <div class="field"><span class="field-label">Affidavit:</span><span class="field-value">${sanitizeHTML(
          formData.graduation?.affidavit || ''
        )}</span></div>
              </div>
              <div class="section">
                <h2>Semester Marks</h2>
                <table>
                  <tr>
                    <th>Semester</th>
                    <th>Marks Obtained</th>
                    <th>Max Marks</th>
                  </tr>
                  ${formData.semesterMarks
          ?.map(
            (sem, index) => `
                    <tr>
                      <td>${index + 1}st Semester</td>
                      <td>${sanitizeHTML(sem.marks || '')}</td>
                      <td>${sanitizeHTML(sem.maxMarks || '')}</td>
                    </tr>
                  `
          )
          .join('') || ''}
                </table>
              </div>
              <div class="section">
                <h2>Preferences of Colleges</h2>
                ${formData.preferences
          ?.map(
            (pref, index) =>
              `<div class="field"><span class="field-label">Preference ${index + 1
              }:</span><span class="field-value">${sanitizeHTML(
                pref || ''
              )}</span></div>`
          )
          .join('') || ''}
              </div>
              <div class="section">
                <h2>CAT/MAT Result Details</h2>
                <div class="field"><span class="field-label">Examination:</span><span class="field-value">${sanitizeHTML(
            formData.examDetails?.type || ''
          )}</span></div>
                <div class="field"><span class="field-label">Year:</span><span class="field-value">${sanitizeHTML(
            formData.examDetails?.year || ''
          )}</span></div>
                <div class="field"><span class="field-label">Marks Obtained:</span><span class="field-value">${sanitizeHTML(
            formData.examDetails?.marks || ''
          )}</span></div>
                <div class="field"><span class="field-label">Max Marks:</span><span class="field-value">${sanitizeHTML(
            formData.examDetails?.maxMarks || ''
          )}</span></div>
                <div class="field"><span class="field-label">Percentage:</span><span class="field-value">${sanitizeHTML(
            formData.examDetails?.percentage || ''
          )}%</span></div>
                <div class="field"><span class="field-label">Result Sheet:</span></div>
                ${resultSheetImageHTML}
              </div>
              <div class="section">
                <h2>Selected Categories</h2>
                <div class="field"><span class="field-label">Self-Financed Seat:</span><span class="field-value">${sanitizeHTML(
            formData.examDetails?.selfFinanced || ''
          )}</span></div>
                <div class="field"><span class="field-label">Category:</span><span class="field-value">${sanitizeHTML(
            formData.examDetails?.category || ''
          )}</span></div>
                <div class="field"><span class="field-label">ALC:</span><span class="field-value">${sanitizeHTML(
            formData.examDetails?.alc || ''
          )}</span></div>
                <div class="field"><span class="field-label">Sports:</span><span class="field-value">${sanitizeHTML(
            formData.examDetails?.sports || ''
          )}</span></div>
                <div class="field"><span class="field-label">Cultural:</span><span class="field-value">${sanitizeHTML(
            formData.examDetails?.cultural || ''
          )}</span></div>
                <div class="field"><span class="field-label">Defence Personnel:</span><span class="field-value">${sanitizeHTML(
            formData.examDetails?.defence || ''
          )}</span></div>
                <div class="field"><span class="field-label">Achievement:</span><span class="field-value">${sanitizeHTML(
            formData.examDetails?.achievement || ''
          )}</span></div>
                <div class="field"><span class="field-label">Super Numerary:</span><span class="field-value">${sanitizeHTML(
            formData.examDetails?.superNumerary || ''
          )}</span></div>
                <div class="field"><span class="field-label">Other Category:</span><span class="field-value">${sanitizeHTML(
            formData.examDetails?.otherCategory || ''
          )}</span></div>
              </div>
              <div class="clear"></div>
            </div>
          </body>
        </html>
      `;

      const { uri } = await Print.printToFileAsync({
        html: htmlContent,
        base64: false,
      });

      const fileUri = `${FileSystem.documentDirectory}MBAAdmissionForm.pdf`;
      await FileSystem.moveAsync({
        from: uri,
        to: fileUri,
      });

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri);
      } else {
        Alert.alert(
          'Sharing Error',
          'Sharing is not available on this device.'
        );
      }
    } catch (error) {
      console.error('PDF Generation Error:', error);
      Alert.alert('Error', 'Failed to generate or share PDF: ' + error.message);
    } finally {
      setDownloading(false);
    }
  };

  const handleLogout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    Alert.alert('Logout Failed', error.message);
  } else {
    navigation.navigate('home'); // ✅ Go to Login screen after logout
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.thankYou}>🎉 Thank You!</Text>
      <Text style={styles.message}>
        Your form has been submitted successfully. You can download your PDF
        below.
      </Text>

      {downloading ? (
        <ActivityIndicator
          size="large"
          color="#007AFF"
          style={{ marginVertical: 20 }}
        />
      ) : (
        <TouchableOpacity style={styles.button} onPress={generatePDF}>
          <Text style={styles.buttonText}>Download PDF</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={[styles.button, styles.logoutButton]}
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  thankYou: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2E86AB',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#2E86AB',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginVertical: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 1, height: 2 },
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
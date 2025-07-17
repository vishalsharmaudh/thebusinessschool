import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Dimensions,
  Modal,
  FlatList,
  ActivityIndicator,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Print from 'expo-print';
import { Ionicons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../supabaseClient';
import { Buffer } from 'buffer';
import { toByteArray } from 'base64-js';

// Scaling functions
const { width } = Dimensions.get('window');
const BASE_WIDTH = 375;

const scaleSize = (size) => {
  const scale = width / BASE_WIDTH;
  return Math.round(size * Math.min(scale, 1.5));
};

const scaleFont = (size) => {
  const scale = width / BASE_WIDTH;
  return Math.round(size * Math.min(scale, 1.2));
};

// Field-to-label mapping for consistent error messages
const fieldLabels = {
  applicantName: 'Applicant Name',
  fatherName: "Father's Name",
  motherName: "Mother's Name",
  correspondenceAddress: 'Correspondence Address',
  permanentAddress: 'Permanent Address',
  gender: 'Gender',
  dateOfBirth: 'Date of Birth',
  annualIncome: 'Annual Income',
  pinCode: 'Pin Code',
  mobileNo: 'Mobile No.',
  alternateContactNo: 'Alternate Contact No.',
  email: 'Email',
  'tenth.board': '10th Board',
  'tenth.year': '10th Year',
  'tenth.marks': '10th Marks Obtained',
  'tenth.maxMarks': '10th Max Marks',
  'tenth.percentage': '10th Percentage',
  'twelfth.board': '12th Board',
  'twelfth.year': '12th Year',
  'twelfth.marks': '12th Marks Obtained',
  'twelfth.maxMarks': '12th Max Marks',
  'twelfth.percentage': '12th Percentage',
  'graduation.field': 'Graduation Field',
  'graduation.university': 'Graduation University',
  'graduation.status': 'Graduation Status',
  'graduation.affidavit': 'Graduation Affidavit',
  'examDetails.type': 'Exam Type',
  'examDetails.year': 'Exam Year',
  'examDetails.marks': 'Exam Marks Obtained',
  'examDetails.maxMarks': 'Exam Max Marks',
  'examDetails.percentage': 'Exam Percentage',
  'examDetails.selfFinanced': 'Self-Financed Category',
  'examDetails.category': 'Category',
  'examDetails.alc': 'ALC',
  'examDetails.sports': 'Sports',
  'examDetails.cultural': 'Cultural',
  'examDetails.defence': 'Defence',
  'examDetails.achievement': 'Achievement',
  'examDetails.superNumerary': 'Super Numerary',
  'examDetails.otherCategory': 'Other Category',
};

// Custom Dropdown Component
const CustomDropdown = ({ label, value, options, onSelect, error }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={[styles.formRow, { marginBottom: scaleSize(12) }]}>
      <Text style={[styles.label, { fontSize: scaleFont(14) }]}>{label}</Text>
      <TouchableOpacity
        style={[
          styles.pickerContainer,
          { height: scaleSize(40), borderRadius: scaleSize(4) },
        ]}
        onPress={() => setModalVisible(true)}>
        <Text
          style={[
            styles.pickerText,
            { fontSize: scaleFont(14), color: value ? '#333' : '#999' },
          ]}>
          {value || `Select ${label}`}
        </Text>
      </TouchableOpacity>
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContent,
              { borderRadius: scaleSize(8), padding: scaleSize(15) },
            ]}>
            {options.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[styles.modalOption, { padding: scaleSize(10) }]}
                onPress={() => {
                  onSelect(option.value);
                  setModalVisible(false);
                }}>
                <Text
                  style={[styles.modalOptionText, { fontSize: scaleFont(14) }]}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={[
                styles.modalCancel,
                { padding: scaleSize(10), marginTop: scaleSize(10) },
              ]}
              onPress={() => setModalVisible(false)}>
              <Text
                style={[styles.modalCancelText, { fontSize: scaleFont(14) }]}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const MBAAdmissionForm = () => {
  const navigation = useNavigation(); // Hook for navigation
  const [formData, setFormData] = useState({
    applicantName: '',
    gender: '',
    fatherName: '',
    motherName: '',
    dateOfBirth: '',
    annualIncome: '',
    correspondenceAddress: '',
    permanentAddress: '',
    pinCode: '',
    mobileNo: '',
    alternateContactNo: '',
    email: '',
    tenth: { board: '', year: '', marks: '', maxMarks: '', percentage: '' },
    twelfth: { board: '', year: '', marks: '', maxMarks: '', percentage: '' },
    graduation: { field: '', university: '', status: '', affidavit: '' },
    semesterMarks: Array(8).fill({ marks: '', maxMarks: '' }),
    examDetails: {
      type: '',
      year: '',
      marks: '',
      maxMarks: '',
      percentage: '',
      selfFinanced: '',
      category: '',
      alc: '',
      sports: '',
      cultural: '',
      defence: '',
      achievement: '',
      superNumerary: '',
      otherCategory: '',
    },
    preferences: ['', '', '', ''],
    resultSheet: null,
    photograph: null,
    signature: null,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const genderOptions = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Other', value: 'Other' },
  ];

  const examTypeOptions = [
    { label: 'CAT', value: 'CAT' },
    { label: 'MAT', value: 'MAT' },
  ];

  const yesNoOptions = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' },
  ];

  // Sanitize HTML to prevent injection in PDF
  const sanitizeHTML = (str) => {
    if (str == null || typeof str !== 'string') return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/`/g, '&#96;')
      .replace(/\n/g, ' ')
      .replace(/\r/g, ' ')
      .trim();
  };

  const calculatePercentage = (marks, maxMarks) => {
    const parsedMarks = parseFloat(marks);
    const parsedMaxMarks = parseFloat(maxMarks);
    if (!isNaN(parsedMarks) && !isNaN(parsedMaxMarks) && parsedMaxMarks > 0) {
      return ((parsedMarks / parsedMaxMarks) * 100).toFixed(2);
    }
    return '';
  };

  const validateField = (field, value) => {
    if (['applicantName', 'fatherName', 'motherName'].includes(field)) {
      if (!value.trim()) return `${fieldLabels[field]} is required`;
      if (!/^[A-Za-z\s'-]*$/.test(value))
        return `${fieldLabels[field]} must not contain numbers`;
      return '';
    }
    switch (field) {
      case 'correspondenceAddress':
      case 'permanentAddress':
        return value.trim() ? '' : `${fieldLabels[field]} is required`;
      case 'gender':
        return ['Male', 'Female', 'Other', ''].includes(value)
          ? ''
          : `${fieldLabels[field]} must be Male, Female, or Other`;
      case 'dateOfBirth':
        const dobRegex = /^\d{2}\/\d{2}\/\d{4}$/;
        if (!value) return `${fieldLabels[field]} is required`;
        if (!dobRegex.test(value))
          return `${fieldLabels[field]} must be DD/MM/YYYY`;
        const [day, month, year] = value.split('/').map(Number);
        const date = new Date(year, month - 1, day);
        return date.getDate() === day &&
          date.getMonth() === month - 1 &&
          year > 1900 &&
          year <= new Date().getFullYear()
          ? ''
          : `Invalid ${fieldLabels[field]}`;
      case 'annualIncome':
      case 'pinCode':
      case 'mobileNo':
        if (!value) return `${fieldLabels[field]} is required`;
        if (!/^\d+$/.test(value))
          return `${fieldLabels[field]} must be numeric`;
        if (field === 'mobileNo' && value.length !== 10)
          return `Invalid ${fieldLabels[field]}`;
        if (field === 'pinCode' && value.length !== 6)
          return `Invalid ${fieldLabels[field]}`;
        return '';
      case 'alternateContactNo':
        return value
          ? /^\d+$/.test(value) && value.length === 10
            ? ''
            : `Invalid ${fieldLabels[field]}`
          : '';
      case 'email':
        if (!value) return `${fieldLabels[field]} is required`;
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? ''
          : `Invalid ${fieldLabels[field]} format`;
      default:
        return '';
    }
  };

  const validateNestedField = (parent, field, value) => {
    const fieldKey = `${parent}.${field}`;
    if (['tenth', 'twelfth'].includes(parent)) {
      if (['board', 'marks', 'maxMarks', 'percentage'].includes(field)) {
        if (!value && field !== 'percentage')
          return `${fieldLabels[fieldKey]} is required`;
        if (
          ['marks', 'maxMarks'].includes(field) &&
          value &&
          !/^\d+(\.\d{1,2})?$/.test(value) &&
          !/^\d+$/.test(value)
        ) {
          return `${fieldLabels[fieldKey]} must be a valid number`;
        }
        if (field === 'percentage' && value && (value < 0 || value > 100)) {
          return `${fieldLabels[fieldKey]} must be between 0 and 100`;
        }
      }
      if (field === 'year') {
        if (!value) return `${fieldLabels[fieldKey]} is required`;
        if (
          !/^\d{4}$/.test(value) ||
          value < 1900 ||
          value > new Date().getFullYear()
        ) {
          return `${fieldLabels[fieldKey]} must be a valid year`;
        }
      }
    }
    if (parent === 'graduation') {
      if (['field', 'university', 'status'].includes(field)) {
        return value ? '' : `${fieldLabels[fieldKey]} is required`;
      }
    }
    if (parent === 'examDetails') {
      if (['marks', 'maxMarks', 'percentage'].includes(field)) {
        if (!value && field !== 'percentage')
          return `${fieldLabels[fieldKey]} is required`;
        if (
          ['marks', 'maxMarks'].includes(field) &&
          value &&
          !/^\d+(\.\d{1,2})?$/.test(value) &&
          !/^\d+$/.test(value)
        ) {
          return `${fieldLabels[fieldKey]} must be a valid number`;
        }
        if (field === 'percentage' && value && (value < 0 || value > 100)) {
          return `${fieldLabels[fieldKey]} must be between 0 and 100`;
        }
      }
      if (field === 'year') {
        if (!value) return `${fieldLabels[fieldKey]} is required`;
        if (
          !/^\d{4}$/.test(value) ||
          value < 1900 ||
          value > new Date().getFullYear()
        ) {
          return `${fieldLabels[fieldKey]} must be a valid year`;
        }
      }
      if (field === 'type') {
        return ['CAT', 'MAT', ''].includes(value)
          ? ''
          : `${fieldLabels[fieldKey]} must be CAT or MAT`;
      }
      if (
        [
          'selfFinanced',
          'category',
          'alc',
          'sports',
          'cultural',
          'defence',
          'achievement',
          'superNumerary',
          'otherCategory',
        ].includes(field)
      ) {
        return ['Yes', 'No', ''].includes(value)
          ? ''
          : `${fieldLabels[fieldKey]} must be Yes or No`;
      }
    }
    return '';
  };

  const validateSemesterMarks = (marks, index) => {
    if (!marks.marks) return `Semester ${index + 1} Marks is required`;
    if (!marks.maxMarks) return `Semester ${index + 1} Max Marks is required`;
    if (
      (!/^\d+(\.\d{1,2})?$/.test(marks.marks) && !/^\d+$/.test(marks.marks)) ||
      (!/^\d+(\.\d{1,2})?$/.test(marks.maxMarks) &&
        !/^\d+$/.test(marks.maxMarks))
    ) {
      return `Semester ${index + 1} Marks and Max Marks must be valid numbers`;
    }
    return '';
  };

  const validatePreferences = (prefs) => {
    return prefs.every((pref, index) =>
      pref ? '' : `Preference ${index + 1} is required`
    );
  };

  const validateForm = () => {
    const newErrors = {};
    [
      'applicantName',
      'gender',
      'fatherName',
      'motherName',
      'dateOfBirth',
      'annualIncome',
      'correspondenceAddress',
      'permanentAddress',
      'pinCode',
      'mobileNo',
      'email',
    ].forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });
    ['tenth', 'twelfth'].forEach((parent) => {
      ['board', 'year', 'marks', 'maxMarks', 'percentage'].forEach((field) => {
        const error = validateNestedField(
          parent,
          field,
          formData[parent][field]
        );
        if (error) newErrors[`${parent}.${field}`] = error;
      });
    });
    ['field', 'university', 'status', 'affidavit'].forEach((field) => {
      const error = validateNestedField(
        'graduation',
        field,
        formData.graduation[field]
      );
      if (error) newErrors[`graduation.${field}`] = error;
    });
    formData.semesterMarks.forEach((marks, index) => {
      const error = validateSemesterMarks(marks, index);
      if (error) newErrors[`semesterMarks.${index}`] = error;
    });
    [
      'type',
      'year',
      'marks',
      'maxMarks',
      'percentage',
      'selfFinanced',
      'category',
      'alc',
      'sports',
      'cultural',
      'defence',
      'achievement',
      'superNumerary',
      'otherCategory',
    ].forEach((field) => {
      const error = validateNestedField(
        'examDetails',
        field,
        formData.examDetails[field]
      );
      if (error) newErrors[`examDetails.${field}`] = error;
    });
    const prefError = validatePreferences(formData.preferences);
    if (!prefError) {
      formData.preferences.forEach((pref, index) => {
        if (!pref)
          newErrors[`preferences.${index}`] = `Preference ${index + 1
            } is required`;
      });
    }
    if (!formData.resultSheet)
      newErrors.resultSheet = 'CAT/MAT Result Sheet is required';
    if (!formData.photograph) newErrors.photograph = 'Photograph is required';
    if (!formData.signature) newErrors.signature = 'Signature is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: validateField(field, value) });
  };

  const handleNestedInputChange = (parent, field, value) => {
    const updatedParent = { ...formData[parent], [field]: value };
    let percentage = formData[parent].percentage;
    if (
      ['tenth', 'twelfth', 'examDetails'].includes(parent) &&
      ['marks', 'maxMarks'].includes(field)
    ) {
      const marks = field === 'marks' ? value : formData[parent].marks;
      const maxMarks = field === 'maxMarks' ? value : formData[parent].maxMarks;
      percentage = calculatePercentage(marks, maxMarks);
      updatedParent.percentage = percentage;
    }
    setFormData({ ...formData, [parent]: updatedParent });
    setErrors({
      ...errors,
      [`${parent}.${field}`]: validateNestedField(parent, field, value),
      ...(percentage !== formData[parent].percentage && {
        [`${parent}.percentage`]: validateNestedField(
          parent,
          'percentage',
          percentage
        ),
      }),
    });
  };

  const handleSemesterMarkChange = (index, field, value) => {
    const updatedMarks = [...formData.semesterMarks];
    updatedMarks[index] = { ...updatedMarks[index], [field]: value };
    setFormData({ ...formData, semesterMarks: updatedMarks });
    setErrors({
      ...errors,
      [`semesterMarks.${index}`]: validateSemesterMarks(
        updatedMarks[index],
        index
      ),
    });
  };

  const handlePreferenceChange = (index, value) => {
    const updatedPreferences = [...formData.preferences];
    updatedPreferences[index] = value;
    setFormData({ ...formData, preferences: updatedPreferences });
    setErrors({
      ...errors,
      [`preferences.${index}`]: value
        ? ''
        : `Preference ${index + 1} is required`,
    });
  };

  const handleFileUpload = async (field) => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Please grant access to your gallery.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // this is still supported
        allowsEditing: true,
        quality: 0.5,
        base64: true,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        const { uri, base64 } = result.assets[0];

        setFormData((prev) => ({
          ...prev,
          [field]: {
            uri,
            fileName: `upload_${field}_${Date.now()}.jpg`,
            base64: `data:image/jpeg;base64,${base64}`,
          },
        }));

        setErrors((prev) => ({ ...prev, [field]: '' }));
      }
    } catch (error) {
      console.error('Upload error:', error);
      Alert.alert('Error', 'Failed to upload file.');
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    if (!validateForm()) {
      Alert.alert('Please fill all required fields.');
      return;
    }

    try {
      // 1. Get the currently logged-in user
      const { data: userData, error: userError } = await supabase.auth.getUser();

      if (userError || !userData?.user?.id) {
        console.error('Failed to get user ID:', userError?.message || 'No user logged in');
        Alert.alert('Error', 'Could not fetch user. Please log in again.');
        return;
      }

      const userId = userData.user.id;
      // 1. Upload Photograph
      let photoPublicUrl = null;
      if (formData.photograph?.base64) {
        const fileName = `photos/${Date.now()}_${formData.email}.jpg`;
        const base64 = formData.photograph.base64.replace(/^data:image\/\w+;base64,/, '');
        const binary = toByteArray(base64);
        const { data, error } = await supabase.storage
          .from('applicant-uploads')
          .upload(fileName, binary, {
            contentType: 'image/jpeg',
            upsert: true,
          });
        if (!error) {
          photoPublicUrl = `https://zbiugzwvntlavqzfquba.supabase.co/storage/v1/object/public/applicant-uploads/${data.path}`;
        }
      }

      // 2. Upload Signature
      let signaturePublicUrl = null;
      if (formData.signature?.base64) {
        const fileName = `signatures/${Date.now()}_${formData.email}.jpg`;
        const base64 = formData.signature.base64.replace(/^data:image\/\w+;base64,/, '');
        const binary = toByteArray(base64);
        const { data, error } = await supabase.storage
          .from('applicant-uploads')
          .upload(fileName, binary, {
            contentType: 'image/jpeg',
            upsert: true,
          });
        if (!error) {
          signaturePublicUrl = `https://zbiugzwvntlavqzfquba.supabase.co/storage/v1/object/public/applicant-uploads/${data.path}`;
        }
      }

      // 3. Upload Result Sheet
      let resultSheetPublicUrl = null;
      if (formData.resultSheet?.base64) {
        const fileName = `result-sheets/${Date.now()}_${formData.email}.jpg`;
        const base64 = formData.resultSheet.base64.replace(/^data:image\/\w+;base64,/, '');
        const binary = toByteArray(base64);
        const { data, error } = await supabase.storage
          .from('applicant-uploads')
          .upload(fileName, binary, {
            contentType: 'image/jpeg',
            upsert: true,
          });
        if (!error) {
          resultSheetPublicUrl = `https://zbiugzwvntlavqzfquba.supabase.co/storage/v1/object/public/applicant-uploads/${data.path}`;
        }
      }

      // Create HTML for the PDF (simple layout)
      const html = `
      <html>
        <body style="font-family: Arial; padding: 16px;">
          <h2 style="text-align: center;">MBA Admission Form</h2>

          <h3>Personal Information</h3>
          <p><strong>Name:</strong> ${formData.applicantName}</p>
          <p><strong>Father's Name:</strong> ${formData.fatherName}</p>
          <p><strong>Mother's Name:</strong> ${formData.motherName}</p>
          <p><strong>Date of Birth:</strong> ${formData.dateOfBirth}</p>
          <p><strong>Gender:</strong> ${formData.gender}</p>
          <p><strong>Annual Income:</strong> ${formData.annualIncome}</p>

          <h3>Contact Details</h3>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Mobile No:</strong> ${formData.mobileNo}</p>
          <p><strong>Alternate Contact:</strong> ${formData.alternateContactNo}</p>
          <p><strong>Correspondence Address:</strong> ${formData.correspondenceAddress}</p>
          <p><strong>Permanent Address:</strong> ${formData.permanentAddress}</p>
          <p><strong>Pin Code:</strong> ${formData.pinCode}</p>

          <h3>10th Class</h3>
          <p>Board: ${formData.tenth.board}, Year: ${formData.tenth.year}</p>
          <p>Marks: ${formData.tenth.marks}/${formData.tenth.maxMarks}, %: ${formData.tenth.percentage}</p>

          <h3>12th Class</h3>
          <p>Board: ${formData.twelfth.board}, Year: ${formData.twelfth.year}</p>
          <p>Marks: ${formData.twelfth.marks}/${formData.twelfth.maxMarks}, %: ${formData.twelfth.percentage}</p>

          <h3>Graduation</h3>
          <p>Field: ${formData.graduation.field}</p>
          <p>University: ${formData.graduation.university}</p>
          <p>Status: ${formData.graduation.status}</p>
          <p>Affidavit Submitted: ${formData.graduation.affidavit}</p>

          <h3>Semester Marks</h3>
          <table border="1" cellpadding="6" cellspacing="0">
            <tr><th>Semester</th><th>Marks</th><th>Max Marks</th></tr>
            ${formData.semesterMarks.map((sem, i) => `
              <tr>
                <td>${i + 1}</td>
                <td>${sem.marks}</td>
                <td>${sem.maxMarks}</td>
              </tr>`).join('')}
          </table>

          <h3>CAT/MAT Exam</h3>
          <p>Type: ${formData.examDetails.type}</p>
          <p>Year: ${formData.examDetails.year}</p>
          <p>Marks: ${formData.examDetails.marks}/${formData.examDetails.maxMarks}</p>
          <p>Percentage: ${formData.examDetails.percentage}</p>
          ${resultSheetPublicUrl
          ? `<h3>Result Sheet</h3><img src="${resultSheetPublicUrl}" style="max-height:300px;" />`
          : '<p><strong>Result Sheet:</strong> Not uploaded</p>'
        }


          <h3>Categories</h3>
          <ul>
            <li>Self-Financed: ${formData.examDetails.selfFinanced}</li>
            <li>Category: ${formData.examDetails.category}</li>
            <li>ALC: ${formData.examDetails.alc}</li>
            <li>Sports: ${formData.examDetails.sports}</li>
            <li>Cultural: ${formData.examDetails.cultural}</li>
            <li>Defence: ${formData.examDetails.defence}</li>
            <li>Achievement: ${formData.examDetails.achievement}</li>
            <li>SuperNumerary: ${formData.examDetails.superNumerary}</li>
            <li>Other: ${formData.examDetails.otherCategory}</li>
          </ul>

          <h3>Preferences</h3>
          <ul>
            ${formData.preferences.map((pref, i) => `<li>Preference ${i + 1}: ${pref}</li>`).join('')}
          </ul>

          ${photoPublicUrl
          ? `<h3>Photograph</h3><img src="${photoPublicUrl}" style="height:100px;" />`
          : '<p><strong>Photograph:</strong> Not uploaded</p>'
        }

${signaturePublicUrl
          ? `<h3>Signature</h3><img src="${signaturePublicUrl}" style="height:50px;" />`
          : '<p><strong>Signature:</strong> Not uploaded</p>'
        }


        </body>
      </html>
    `;

      // Step 1: Generate the PDF file
      const { uri } = await Print.printToFileAsync({
        html,
        base64: false,
      });

      const base64PDF = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const binaryPDF = toByteArray(base64PDF);
      const pdfFileName = `application_${Date.now()}_${formData.email}.pdf`;

      // Step 3: Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('admission-pdfs') // use the bucket you use in viewer
        .upload(pdfFileName, binaryPDF, {
          contentType: 'application/pdf',
          upsert: true,
        });

      if (uploadError) {
        console.error('PDF Upload Error:', uploadError.message);
        Alert.alert('Upload Failed', 'Could not upload your PDF.');
        return;
      }
      await supabase.from('applications').insert([{
        user_id: userId,
        pdf_url: pdfFileName,
        photo_url: photoPublicUrl,
        signature_url: signaturePublicUrl,
        result_sheet_url: resultSheetPublicUrl,
        form_data: formData,
        status: 'Pending',
      }]);

      // Step 5: Navigate to Thank You screen with local PDF path
      navigation.navigate('thankupdf', {
        pdfUri: uri,
        formData: formData,
      });

    } catch (err) {
      console.error('Error:', err);
      Alert.alert('Something went wrong. Please try again.');
    }
    finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={[
          styles.contentContainer,
          { padding: scaleSize(15), paddingBottom: scaleSize(20) },
        ]}>
        <View
          style={[
            styles.header,
            {
              padding: scaleSize(15),
              borderRadius: scaleSize(5),
              marginBottom: scaleSize(15),
            },
          ]}>
          <Text style={[styles.headerText, { fontSize: scaleFont(18) }]}>
            Application Form For MBA Admission
          </Text>
        </View>

        <View
          style={[
            styles.card,
            {
              padding: scaleSize(15),
              marginBottom: scaleSize(15),
              borderRadius: scaleSize(5),
            },
          ]}>
          <View
            style={[
              styles.sectionHeader,
              { paddingBottom: scaleSize(8), marginBottom: scaleSize(15) },
            ]}>
            <Text style={[styles.sectionTitle, { fontSize: scaleFont(16) }]}>
              Personal Information
            </Text>
          </View>

          <View style={[styles.formRow, { marginBottom: scaleSize(12) }]}>
            <Text style={[styles.label, { fontSize: scaleFont(14) }]}>
              Applicant Name
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  height: scaleSize(40),
                  fontSize: scaleFont(14),
                  paddingHorizontal: scaleSize(10),
                },
              ]}
              value={formData.applicantName}
              onChangeText={(text) => handleInputChange('applicantName', text)}
              placeholder="e.g. John Doe"
            />
            {errors.applicantName && (
              <Text style={styles.errorText}>{errors.applicantName}</Text>
            )}
          </View>

          <CustomDropdown
            label="Gender"
            value={formData.gender}
            options={genderOptions}
            onSelect={(value) => handleInputChange('gender', value)}
            error={errors.gender}
          />

          <View style={[styles.formRow, { marginBottom: scaleSize(12) }]}>
            <Text style={[styles.label, { fontSize: scaleFont(14) }]}>
              Father's Name
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  height: scaleSize(40),
                  fontSize: scaleFont(14),
                  paddingHorizontal: scaleSize(10),
                },
              ]}
              value={formData.fatherName}
              onChangeText={(text) => handleInputChange('fatherName', text)}
              placeholder="e.g. Michael Smith"
            />
            {errors.fatherName && (
              <Text style={styles.errorText}>{errors.fatherName}</Text>
            )}
          </View>

          <View style={[styles.formRow, { marginBottom: scaleSize(12) }]}>
            <Text style={[styles.label, { fontSize: scaleFont(14) }]}>
              Mother's Name
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  height: scaleSize(40),
                  fontSize: scaleFont(14),
                  paddingHorizontal: scaleSize(10),
                },
              ]}
              value={formData.motherName}
              onChangeText={(text) => handleInputChange('motherName', text)}
              placeholder="e.g. Sarah Smith"
            />
            {errors.motherName && (
              <Text style={styles.errorText}>{errors.motherName}</Text>
            )}
          </View>

          <View style={[styles.formRow, { marginBottom: scaleSize(12) }]}>
            <Text style={[styles.label, { fontSize: scaleFont(14) }]}>
              Date Of Birth (DD/MM/YYYY)
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  height: scaleSize(40),
                  fontSize: scaleFont(14),
                  paddingHorizontal: scaleSize(10),
                },
              ]}
              value={formData.dateOfBirth}
              onChangeText={(text) => handleInputChange('dateOfBirth', text)}
              placeholder="e.g. 15/05/1995"
              keyboardType="default"
            />
            {errors.dateOfBirth && (
              <Text style={styles.errorText}>{errors.dateOfBirth}</Text>
            )}
          </View>

          <View style={[styles.formRow, { marginBottom: scaleSize(12) }]}>
            <Text style={[styles.label, { fontSize: scaleFont(14) }]}>
              Annual Income of the Family
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  height: scaleSize(40),
                  fontSize: scaleFont(14),
                  paddingHorizontal: scaleSize(10),
                },
              ]}
              value={formData.annualIncome}
              onChangeText={(text) => handleInputChange('annualIncome', text)}
              keyboardType="numeric"
              placeholder="e.g. 500000"
            />
            {errors.annualIncome && (
              <Text style={styles.errorText}>{errors.annualIncome}</Text>
            )}
          </View>

          <View style={[styles.formRow, { marginBottom: scaleSize(12) }]}>
            <Text style={[styles.label, { fontSize: scaleFont(14) }]}>
              Address for Correspondence
            </Text>
            <TextInput
              style={[
                styles.input,
                styles.multilineInput,
                {
                  height: scaleSize(80),
                  fontSize: scaleFont(14),
                  paddingHorizontal: scaleSize(10),
                  paddingVertical: scaleSize(10),
                },
              ]}
              multiline
              numberOfLines={4}
              value={formData.correspondenceAddress}
              onChangeText={(text) =>
                handleInputChange('correspondenceAddress', text)
              }
              placeholder="Enter full address"
            />
            {errors.correspondenceAddress && (
              <Text style={styles.errorText}>
                {errors.correspondenceAddress}
              </Text>
            )}
          </View>
        </View>

        <View
          style={[
            styles.card,
            {
              padding: scaleSize(15),
              marginBottom: scaleSize(15),
              borderRadius: scaleSize(5),
            },
          ]}>
          <View
            style={[
              styles.sectionHeader,
              { paddingBottom: scaleSize(8), marginBottom: scaleSize(15) },
            ]}>
            <Text style={[styles.sectionTitle, { fontSize: scaleFont(16) }]}>
              Contact Information
            </Text>
          </View>

          <View style={[styles.formRow, { marginBottom: scaleSize(12) }]}>
            <Text style={[styles.label, { fontSize: scaleFont(14) }]}>
              Permanent Address
            </Text>
            <TextInput
              style={[
                styles.input,
                styles.multilineInput,
                {
                  height: scaleSize(80),
                  fontSize: scaleFont(14),
                  paddingHorizontal: scaleSize(10),
                  paddingVertical: scaleSize(10),
                },
              ]}
              multiline
              numberOfLines={4}
              value={formData.permanentAddress}
              onChangeText={(text) =>
                handleInputChange('permanentAddress', text)
              }
              placeholder="Enter full address"
            />
            {errors.permanentAddress && (
              <Text style={styles.errorText}>{errors.permanentAddress}</Text>
            )}
          </View>

          <View style={[styles.formRow, { marginBottom: scaleSize(12) }]}>
            <Text style={[styles.label, { fontSize: scaleFont(14) }]}>
              Pin Code
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  height: scaleSize(40),
                  fontSize: scaleFont(14),
                  paddingHorizontal: scaleSize(10),
                },
              ]}
              value={formData.pinCode}
              onChangeText={(text) => handleInputChange('pinCode', text)}
              keyboardType="numeric"
              maxLength={6}
              placeholder="e.g. 123456"
            />
            {errors.pinCode && (
              <Text style={styles.errorText}>{errors.pinCode}</Text>
            )}
          </View>

          <View style={[styles.formRow, { marginBottom: scaleSize(12) }]}>
            <Text style={[styles.label, { fontSize: scaleFont(14) }]}>
              Mobile No.
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  height: scaleSize(40),
                  fontSize: scaleFont(14),
                  paddingHorizontal: scaleSize(10),
                },
              ]}
              value={formData.mobileNo}
              onChangeText={(text) => handleInputChange('mobileNo', text)}
              keyboardType="phone-pad"
              maxLength={10}
              placeholder="e.g. 9876543210"
            />
            {errors.mobileNo && (
              <Text style={styles.errorText}>{errors.mobileNo}</Text>
            )}
          </View>

          <View style={[styles.formRow, { marginBottom: scaleSize(12) }]}>
            <Text style={[styles.label, { fontSize: scaleFont(14) }]}>
              Alternate Contact No.
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  height: scaleSize(40),
                  fontSize: scaleFont(14),
                  paddingHorizontal: scaleSize(10),
                },
              ]}
              value={formData.alternateContactNo}
              onChangeText={(text) =>
                handleInputChange('alternateContactNo', text)
              }
              keyboardType="phone-pad"
              maxLength={10}
              placeholder="e.g. 9876543210 (optional)"
            />
            {errors.alternateContactNo && (
              <Text style={styles.errorText}>{errors.alternateContactNo}</Text>
            )}
          </View>

          <View style={[styles.formRow, { marginBottom: scaleSize(12) }]}>
            <Text style={[styles.label, { fontSize: scaleFont(14) }]}>
              E-mail id
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  height: scaleSize(40),
                  fontSize: scaleFont(14),
                  paddingHorizontal: scaleSize(10),
                },
              ]}
              value={formData.email}
              onChangeText={(text) => handleInputChange('email', text)}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="e.g. john@example.com"
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
          </View>
        </View>

        <View
          style={[
            styles.card,
            {
              padding: scaleSize(15),
              marginBottom: scaleSize(15),
              borderRadius: scaleSize(5),
            },
          ]}>
          <View
            style={[
              styles.sectionHeader,
              { paddingBottom: scaleSize(8), marginBottom: scaleSize(15) },
            ]}>
            <Text style={[styles.sectionTitle, { fontSize: scaleFont(16) }]}>
              School Level Education Details
            </Text>
          </View>

          <View style={[styles.formRow, { marginBottom: scaleSize(5) }]}>
            <Text
              style={[
                styles.label,
                styles.subSectionTitle,
                { fontSize: scaleFont(14) },
              ]}>
              10th Details
            </Text>
          </View>

          <View style={[styles.formRow, { marginBottom: scaleSize(12) }]}>
            <Text style={[styles.label, { fontSize: scaleFont(14) }]}>
              Name of the Board
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  height: scaleSize(40),
                  fontSize: scaleFont(14),
                  paddingHorizontal: scaleSize(10),
                },
              ]}
              value={formData.tenth.board}
              onChangeText={(text) =>
                handleNestedInputChange('tenth', 'board', text)
              }
              placeholder="e.g. CBSE"
            />
            {errors['tenth.board'] && (
              <Text style={styles.errorText}>{errors['tenth.board']}</Text>
            )}
          </View>

          <View style={[styles.formRow, { marginBottom: scaleSize(12) }]}>
            <Text style={[styles.label, { fontSize: scaleFont(14) }]}>
              Year
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  height: scaleSize(40),
                  fontSize: scaleFont(14),
                  paddingHorizontal: scaleSize(10),
                },
              ]}
              value={formData.tenth.year}
              onChangeText={(text) =>
                handleNestedInputChange('tenth', 'year', text)
              }
              keyboardType="numeric"
              maxLength={4}
              placeholder="e.g. 2015"
            />
            {errors['tenth.year'] && (
              <Text style={styles.errorText}>{errors['tenth.year']}</Text>
            )}
          </View>

          <View style={[styles.formRow, { marginBottom: scaleSize(12) }]}>
            <Text style={[styles.label, { fontSize: scaleFont(14) }]}>
              Marks Obtained
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  height: scaleSize(40),
                  fontSize: scaleFont(14),
                  paddingHorizontal: scaleSize(10),
                },
              ]}
              value={formData.tenth.marks}
              onChangeText={(text) =>
                handleNestedInputChange('tenth', 'marks', text)
              }
              keyboardType="numeric"
              placeholder="e.g. 450"
            />
            {errors['tenth.marks'] && (
              <Text style={styles.errorText}>{errors['tenth.marks']}</Text>
            )}
          </View>

          <View style={[styles.formRow, { marginBottom: scaleSize(12) }]}>
            <Text style={[styles.label, { fontSize: scaleFont(14) }]}>
              Max Marks
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  height: scaleSize(40),
                  fontSize: scaleFont(14),
                  paddingHorizontal: scaleSize(10),
                },
              ]}
              value={formData.tenth.maxMarks}
              onChangeText={(text) =>
                handleNestedInputChange('tenth', 'maxMarks', text)
              }
              keyboardType="numeric"
              placeholder="e.g. 500"
            />
            {errors['tenth.maxMarks'] && (
              <Text style={styles.errorText}>{errors['tenth.maxMarks']}</Text>
            )}
          </View>

          <View style={[styles.formRow, { marginBottom: scaleSize(12) }]}>
            <Text style={[styles.label, { fontSize: scaleFont(14) }]}>
              Percentage %
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  height: scaleSize(40),
                  fontSize: scaleFont(14),
                  paddingHorizontal: scaleSize(10),
                  backgroundColor: '#e0e0e0',
                },
              ]}
              value={formData.tenth.percentage}
              editable={false}
            />
            {errors['tenth.percentage'] && (
              <Text style={styles.errorText}>{errors['tenth.percentage']}</Text>
            )}
          </View>

          <View
            style={[
              styles.formRow,
              { marginTop: scaleSize(15), marginBottom: scaleSize(5) },
            ]}>
            <Text
              style={[
                styles.label,
                styles.subSectionTitle,
                { fontSize: scaleFont(14) },
              ]}>
              12th Details
            </Text>
          </View>

          <View style={[styles.formRow, { marginBottom: scaleSize(12) }]}>
            <Text style={[styles.label, { fontSize: scaleFont(14) }]}>
              Name of the Board
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  height: scaleSize(40),
                  fontSize: scaleFont(14),
                  paddingHorizontal: scaleSize(10),
                },
              ]}
              value={formData.twelfth.board}
              onChangeText={(text) =>
                handleNestedInputChange('twelfth', 'board', text)
              }
              placeholder="e.g. CBSE"
            />
            {errors['twelfth.board'] && (
              <Text style={styles.errorText}>{errors['twelfth.board']}</Text>
            )}
          </View>

          <View style={[styles.formRow, { marginBottom: scaleSize(12) }]}>
            <Text style={[styles.label, { fontSize: scaleFont(14) }]}>
              Year
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  height: scaleSize(40),
                  fontSize: scaleFont(14),
                  paddingHorizontal: scaleSize(10),
                },
              ]}
              value={formData.twelfth.year}
              onChangeText={(text) =>
                handleNestedInputChange('twelfth', 'year', text)
              }
              keyboardType="numeric"
              maxLength={4}
              placeholder="e.g. 2017"
            />
            {errors['twelfth.year'] && (
              <Text style={styles.errorText}>{errors['twelfth.year']}</Text>
            )}
          </View>

          <View style={[styles.formRow, { marginBottom: scaleSize(12) }]}>
            <Text style={[styles.label, { fontSize: scaleFont(14) }]}>
              Marks Obtained
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  height: scaleSize(40),
                  fontSize: scaleFont(14),
                  paddingHorizontal: scaleSize(10),
                },
              ]}
              value={formData.twelfth.marks}
              onChangeText={(text) =>
                handleNestedInputChange('twelfth', 'marks', text)
              }
              keyboardType="numeric"
              placeholder="e.g. 420"
            />
            {errors['twelfth.marks'] && (
              <Text style={styles.errorText}>{errors['twelfth.marks']}</Text>
            )}
          </View>

          <View style={[styles.formRow, { marginBottom: scaleSize(12) }]}>
            <Text style={[styles.label, { fontSize: scaleFont(14) }]}>
              Max Marks
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  height: scaleSize(40),
                  fontSize: scaleFont(14),
                  paddingHorizontal: scaleSize(10),
                },
              ]}
              value={formData.twelfth.maxMarks}
              onChangeText={(text) =>
                handleNestedInputChange('twelfth', 'maxMarks', text)
              }
              keyboardType="numeric"
              placeholder="e.g. 500"
            />
            {errors['twelfth.maxMarks'] && (
              <Text style={styles.errorText}>{errors['twelfth.maxMarks']}</Text>
            )}
          </View>

          <View style={[styles.formRow, { marginBottom: scaleSize(12) }]}>
            <Text style={[styles.label, { fontSize: scaleFont(14) }]}>
              Percentage %
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  height: scaleSize(40),
                  fontSize: scaleFont(14),
                  paddingHorizontal: scaleSize(10),
                  backgroundColor: '#e0e0e0',
                },
              ]}
              value={formData.twelfth.percentage}
              editable={false}
            />
            {errors['twelfth.percentage'] && (
              <Text style={styles.errorText}>
                {errors['twelfth.percentage']}
              </Text>
            )}
          </View>
        </View>

        <View
          style={[
            styles.card,
            {
              padding: scaleSize(15),
              marginBottom: scaleSize(15),
              borderRadius: scaleSize(5),
            },
          ]}>
          <View
            style={[
              styles.sectionHeader,
              { paddingBottom: scaleSize(8), marginBottom: scaleSize(15) },
            ]}>
            <Text style={[styles.sectionTitle, { fontSize: scaleFont(16) }]}>
              University Level Education Details
            </Text>
          </View>

          <View style={[styles.formRow, { marginBottom: scaleSize(12) }]}>
            <Text style={[styles.label, { fontSize: scaleFont(14) }]}>
              Graduation in which field
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  height: scaleSize(40),
                  fontSize: scaleFont(14),
                  paddingHorizontal: scaleSize(10),
                },
              ]}
              value={formData.graduation.field}
              onChangeText={(text) =>
                handleNestedInputChange('graduation', 'field', text)
              }
              placeholder="e.g. B.Com"
            />
            {errors['graduation.field'] && (
              <Text style={styles.errorText}>{errors['graduation.field']}</Text>
            )}
          </View>

          <View style={[styles.formRow, { marginBottom: scaleSize(12) }]}>
            <Text style={[styles.label, { fontSize: scaleFont(14) }]}>
              University
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  height: scaleSize(40),
                  fontSize: scaleFont(14),
                  paddingHorizontal: scaleSize(10),
                },
              ]}
              value={formData.graduation.university}
              onChangeText={(text) =>
                handleNestedInputChange('graduation', 'university', text)
              }
              placeholder="e.g. Delhi University"
            />
            {errors['graduation.university'] && (
              <Text style={styles.errorText}>
                {errors['graduation.university']}
              </Text>
            )}
          </View>

          <View style={[styles.formRow, { marginBottom: scaleSize(12) }]}>
            <Text style={[styles.label, { fontSize: scaleFont(14) }]}>
              Status of Qualifying Examination
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  height: scaleSize(40),
                  fontSize: scaleFont(14),
                  paddingHorizontal: scaleSize(10),
                },
              ]}
              value={formData.graduation.status}
              onChangeText={(text) =>
                handleNestedInputChange('graduation', 'status', text)
              }
              placeholder="e.g. Completed"
            />
            {errors['graduation.status'] && (
              <Text style={styles.errorText}>
                {errors['graduation.status']}
              </Text>
            )}
          </View>

          <View style={[styles.formRow, { marginBottom: scaleSize(12) }]}>
            <Text style={[styles.label, { fontSize: scaleFont(14) }]}>
              Affidavit Submitted For
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  height: scaleSize(40),
                  fontSize: scaleFont(14),
                  paddingHorizontal: scaleSize(10),
                },
              ]}
              value={formData.graduation.affidavit}
              onChangeText={(text) =>
                handleNestedInputChange('graduation', 'affidavit', text)
              }
              placeholder="e.g. Gap Year Affidavit"
            />
            {errors['graduation.affidavit'] && (
              <Text style={styles.errorText}>
                {errors['graduation.affidavit']}
              </Text>
            )}
          </View>
        </View>

        <View
          style={[
            styles.card,
            {
              padding: scaleSize(15),
              marginBottom: scaleSize(15),
              borderRadius: scaleSize(5),
            },
          ]}>
          <View
            style={[
              styles.sectionHeader,
              { paddingBottom: scaleSize(8), marginBottom: scaleSize(15) },
            ]}>
            <Text style={[styles.sectionTitle, { fontSize: scaleFont(16) }]}>
              Semester Marks
            </Text>
          </View>

          <View
            style={[
              styles.tableHeader,
              { paddingBottom: scaleSize(8), marginBottom: scaleSize(8) },
            ]}>
            <Text
              style={[
                styles.tableHeaderCell,
                { flex: 1.5, fontSize: scaleFont(13) },
              ]}>
              Semester
            </Text>
            <Text style={[styles.tableHeaderCell, { fontSize: scaleFont(13) }]}>
              Marks Obtained
            </Text>
            <Text style={[styles.tableHeaderCell, { fontSize: scaleFont(13) }]}>
              Max Marks
            </Text>
          </View>

          {formData.semesterMarks.map((item, index) => (
            <View key={index} style={[styles.tableRow, { marginBottom: scaleSize(8) }]}>
              <Text
                style={[
                  styles.tableCell,
                  { flex: 1.5, fontSize: scaleFont(13) },
                ]}>
                {index + 1}st Sem
              </Text>

              <TextInput
                style={[
                  styles.tableCell,
                  styles.input,
                  {
                    height: scaleSize(35),
                    fontSize: scaleFont(13),
                    paddingHorizontal: scaleSize(5),
                    marginHorizontal: scaleSize(2),
                  },
                ]}
                value={item.marks}
                onChangeText={(text) =>
                  handleSemesterMarkChange(index, 'marks', text)
                }
                keyboardType="numeric"
                placeholder="e.g. 300"
              />

              <TextInput
                style={[
                  styles.tableCell,
                  styles.input,
                  {
                    height: scaleSize(35),
                    fontSize: scaleFont(13),
                    paddingHorizontal: scaleSize(5),
                    marginHorizontal: scaleSize(2),
                  },
                ]}
                value={item.maxMarks}
                onChangeText={(text) =>
                  handleSemesterMarkChange(index, 'maxMarks', text)
                }
                keyboardType="numeric"
                placeholder="e.g. 400"
              />

              {errors[`semesterMarks.${index}`] && (
                <Text style={[styles.errorText, { marginTop: scaleSize(5) }]}>
                  {errors[`semesterMarks.${index}`]}
                </Text>
              )}
            </View>
          ))}

        </View>

        <View
          style={[
            styles.card,
            {
              padding: scaleSize(15),
              marginBottom: scaleSize(15),
              borderRadius: scaleSize(5),
            },
          ]}>
          <View
            style={[
              styles.sectionHeader,
              { paddingBottom: scaleSize(8), marginBottom: scaleSize(15) },
            ]}>
            <Text style={[styles.sectionTitle, { fontSize: scaleFont(16) }]}>
              Preferences of Colleges
            </Text>
          </View>

          {[1, 2, 3, 4].map((pref) => (
            <View
              key={pref}
              style={[styles.prefRow, { marginBottom: scaleSize(15) }]}>
              <View style={[styles.formRow, { marginBottom: scaleSize(5) }]}>
                <Text
                  style={[
                    styles.label,
                    styles.subSectionTitle,
                    { fontSize: scaleFont(14) },
                  ]}>
                  Preference {pref}
                </Text>
              </View>
              <TextInput
                style={[
                  styles.input,
                  {
                    height: scaleSize(40),
                    fontSize: scaleFont(14),
                    paddingHorizontal: scaleSize(10),
                  },
                ]}
                value={formData.preferences[pref - 1]}
                onChangeText={(text) => handlePreferenceChange(pref - 1, text)}
                placeholder={`e.g. College ${pref}`}
              />
              {errors[`preferences.${pref - 1}`] && (
                <Text style={styles.errorText}>
                  {errors[`preferences.${pref - 1}`]}
                </Text>
              )}
            </View>
          ))}
        </View>

        <View
          style={[
            styles.card,
            {
              padding: scaleSize(15),
              marginBottom: scaleSize(15),
              borderRadius: scaleSize(5),
            },
          ]}>
          <View
            style={[
              styles.sectionHeader,
              { paddingBottom: scaleSize(8), marginBottom: scaleSize(15) },
            ]}>
            <Text style={[styles.sectionTitle, { fontSize: scaleFont(16) }]}>
              CAT/MAT Result Details
            </Text>
          </View>

          <CustomDropdown
            label="Name of the Examination (CAT/MAT)"
            value={formData.examDetails.type}
            options={examTypeOptions}
            onSelect={(value) =>
              handleNestedInputChange('examDetails', 'type', value)
            }
            error={errors['examDetails.type']}
          />

          <View style={[styles.formRow, { marginBottom: scaleSize(12) }]}>
            <Text style={[styles.label, { fontSize: scaleFont(14) }]}>
              Year
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  height: scaleSize(40),
                  fontSize: scaleFont(14),
                  paddingHorizontal: scaleSize(10),
                },
              ]}
              value={formData.examDetails.year}
              onChangeText={(text) =>
                handleNestedInputChange('examDetails', 'year', text)
              }
              keyboardType="numeric"
              maxLength={4}
              placeholder="e.g. 2023"
            />
            {errors['examDetails.year'] && (
              <Text style={styles.errorText}>{errors['examDetails.year']}</Text>
            )}
          </View>

          <View style={[styles.formRow, { marginBottom: scaleSize(12) }]}>
            <Text style={[styles.label, { fontSize: scaleFont(14) }]}>
              Marks Obtained
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  height: scaleSize(40),
                  fontSize: scaleFont(14),
                  paddingHorizontal: scaleSize(10),
                },
              ]}
              value={formData.examDetails.marks}
              onChangeText={(text) =>
                handleNestedInputChange('examDetails', 'marks', text)
              }
              keyboardType="numeric"
              placeholder="e.g. 120"
            />
            {errors['examDetails.marks'] && (
              <Text style={styles.errorText}>
                {errors['examDetails.marks']}
              </Text>
            )}
          </View>

          <View style={[styles.formRow, { marginBottom: scaleSize(12) }]}>
            <Text style={[styles.label, { fontSize: scaleFont(14) }]}>
              Max Marks
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  height: scaleSize(40),
                  fontSize: scaleFont(14),
                  paddingHorizontal: scaleSize(10),
                },
              ]}
              value={formData.examDetails.maxMarks}
              onChangeText={(text) =>
                handleNestedInputChange('examDetails', 'maxMarks', text)
              }
              keyboardType="numeric"
              placeholder="e.g. 200"
            />
            {errors['examDetails.maxMarks'] && (
              <Text style={styles.errorText}>
                {errors['examDetails.maxMarks']}
              </Text>
            )}
          </View>

          <View style={[styles.formRow, { marginBottom: scaleSize(12) }]}>
            <Text style={[styles.label, { fontSize: scaleFont(14) }]}>
              Percentage %
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  height: scaleSize(40),
                  fontSize: scaleFont(14),
                  paddingHorizontal: scaleSize(10),
                  backgroundColor: '#e0e0e0',
                },
              ]}
              value={formData.examDetails.percentage}
              editable={false}
            />
            {errors['examDetails.percentage'] && (
              <Text style={styles.errorText}>
                {errors['examDetails.percentage']}
              </Text>
            )}
          </View>

          <View style={[styles.formRow, { marginBottom: scaleSize(12) }]}>
            <Text style={[styles.label, { fontSize: scaleFont(14) }]}>
              CAT/MAT Result Sheet
            </Text>
            <TouchableOpacity
              style={[
                styles.fileUploadButton,
                {
                  padding: scaleSize(10),
                  borderRadius: scaleSize(4),
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              ]}
              onPress={() => handleFileUpload('resultSheet')}>
              <Ionicons
                name="cloud-upload-outline"
                size={scaleFont(16)}
                color="#555"
                style={{ marginRight: scaleSize(5) }}
              />
              <Text
                style={[styles.fileUploadText, { fontSize: scaleFont(14) }]}>
                {formData.resultSheet ? 'File Selected' : 'Choose File'}
              </Text>
            </TouchableOpacity>
            {formData.resultSheet && (
              <View
                style={[
                  styles.imagePreviewContainer,
                  { marginTop: scaleSize(10) },
                ]}>
                <Text
                  style={[
                    styles.imagePreviewText,
                    { fontSize: scaleFont(14) },
                  ]}>
                  Preview:
                </Text>
                <Image
                  source={{ uri: formData.resultSheet.uri }}
                  style={[
                    styles.imagePreview,
                    {
                      width: scaleSize(100),
                      height: scaleSize(100),
                      borderRadius: scaleSize(5),
                    },
                  ]}
                />
              </View>
            )}
            {errors.resultSheet && (
              <Text style={styles.errorText}>{errors.resultSheet}</Text>
            )}
          </View>
        </View>

        <View
          style={[
            styles.card,
            {
              padding: scaleSize(15),
              marginBottom: scaleSize(15),
              borderRadius: scaleSize(5),
            },
          ]}>
          <View
            style={[
              styles.sectionHeader,
              { paddingBottom: scaleSize(8), marginBottom: scaleSize(15) },
            ]}>
            <Text style={[styles.sectionTitle, { fontSize: scaleFont(16) }]}>
              Selected Categories
            </Text>
          </View>

          <CustomDropdown
            label="Interested under Self-Financed Seat Category"
            value={formData.examDetails.selfFinanced}
            options={yesNoOptions}
            onSelect={(value) =>
              handleNestedInputChange('examDetails', 'selfFinanced', value)
            }
            error={errors['examDetails.selfFinanced']}
          />

          <CustomDropdown
            label="Category"
            value={formData.examDetails.category}
            options={yesNoOptions}
            onSelect={(value) =>
              handleNestedInputChange('examDetails', 'category', value)
            }
            error={errors['examDetails.category']}
          />

          <CustomDropdown
            label="ALC"
            value={formData.examDetails.alc}
            options={yesNoOptions}
            onSelect={(value) =>
              handleNestedInputChange('examDetails', 'alc', value)
            }
            error={errors['examDetails.alc']}
          />

          <CustomDropdown
            label="Sports"
            value={formData.examDetails.sports}
            options={yesNoOptions}
            onSelect={(value) =>
              handleNestedInputChange('examDetails', 'sports', value)
            }
            error={errors['examDetails.sports']}
          />

          <CustomDropdown
            label="Cultural"
            value={formData.examDetails.cultural}
            options={yesNoOptions}
            onSelect={(value) =>
              handleNestedInputChange('examDetails', 'cultural', value)
            }
            error={errors['examDetails.cultural']}
          />

          <CustomDropdown
            label="Child of Defence Personnel or Ex-Serviceman"
            value={formData.examDetails.defence}
            options={yesNoOptions}
            onSelect={(value) =>
              handleNestedInputChange('examDetails', 'defence', value)
            }
            error={errors['examDetails.defence']}
          />

          <CustomDropdown
            label="Achievement Category"
            value={formData.examDetails.achievement}
            options={yesNoOptions}
            onSelect={(value) =>
              handleNestedInputChange('examDetails', 'achievement', value)
            }
            error={errors['examDetails.achievement']}
          />

          <CustomDropdown
            label="Super Numerary Category"
            value={formData.examDetails.superNumerary}
            options={yesNoOptions}
            onSelect={(value) =>
              handleNestedInputChange('examDetails', 'superNumerary', value)
            }
            error={errors['examDetails.superNumerary']}
          />

          <CustomDropdown
            label="Any Other Category"
            value={formData.examDetails.otherCategory}
            options={yesNoOptions}
            onSelect={(value) =>
              handleNestedInputChange('examDetails', 'otherCategory', value)
            }
            error={errors['examDetails.otherCategory']}
          />
        </View>

        <View
          style={[
            styles.card,
            {
              padding: scaleSize(15),
              marginBottom: scaleSize(15),
              borderRadius: scaleSize(5),
            },
          ]}>
          <View
            style={[
              styles.sectionHeader,
              { paddingBottom: scaleSize(8), marginBottom: scaleSize(15) },
            ]}>
            <Text style={[styles.sectionTitle, { fontSize: scaleFont(16) }]}>
              Upload Photograph / Signature
            </Text>
          </View>

          <View style={[styles.formRow, { marginBottom: scaleSize(12) }]}>
            <Text style={[styles.label, { fontSize: scaleFont(14) }]}>
              Photograph
            </Text>
            <TouchableOpacity
              style={[
                styles.fileUploadButton,
                {
                  padding: scaleSize(10),
                  borderRadius: scaleSize(4),
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              ]}
              onPress={() => handleFileUpload('photograph')}>
              <Ionicons
                name="cloud-upload-outline"
                size={scaleFont(16)}
                color="#555"
                style={{ marginRight: scaleSize(5) }}
              />
              <Text
                style={[styles.fileUploadText, { fontSize: scaleFont(14) }]}>
                {formData.photograph ? 'File Selected' : 'Choose File'}
              </Text>
            </TouchableOpacity>
            {formData.photograph && (
              <View
                style={[
                  styles.imagePreviewContainer,
                  { marginTop: scaleSize(10) },
                ]}>
                <Text
                  style={[
                    styles.imagePreviewText,
                    { fontSize: scaleFont(14) },
                  ]}>
                  Preview:
                </Text>
                <Image
                  source={{ uri: formData.photograph.uri }}
                  style={[
                    styles.imagePreview,
                    {
                      width: scaleSize(100),
                      height: scaleSize(100),
                      borderRadius: scaleSize(5),
                    },
                  ]}
                />
              </View>
            )}
            {errors.photograph && (
              <Text style={styles.errorText}>{errors.photograph}</Text>
            )}
          </View>

          <View style={[styles.formRow, { marginBottom: scaleSize(12) }]}>
            <Text style={[styles.label, { fontSize: scaleFont(14) }]}>
              Signature
            </Text>
            <TouchableOpacity
              style={[
                styles.fileUploadButton,
                {
                  padding: scaleSize(10),
                  borderRadius: scaleSize(4),
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              ]}
              onPress={() => handleFileUpload('signature')}>
              <Ionicons
                name="cloud-upload-outline"
                size={scaleFont(16)}
                color="#555"
                style={{ marginRight: scaleSize(5) }}
              />
              <Text
                style={[styles.fileUploadText, { fontSize: scaleFont(14) }]}>
                {formData.signature ? 'File Selected' : 'Choose File'}
              </Text>
            </TouchableOpacity>
            {formData.signature && (
              <View
                style={[
                  styles.imagePreviewContainer,
                  { marginTop: scaleSize(10) },
                ]}>
                <Text
                  style={[
                    styles.imagePreviewText,
                    { fontSize: scaleFont(14) },
                  ]}>
                  Preview:
                </Text>
                <Image
                  source={{ uri: formData.signature.uri }}
                  style={[
                    styles.imagePreview,
                    {
                      width: scaleSize(100),
                      height: scaleSize(50),
                      borderRadius: scaleSize(5),
                    },
                  ]}
                />
              </View>
            )}
            {errors.signature && (
              <Text style={styles.errorText}>{errors.signature}</Text>
            )}


          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.submitButton,
            {
              padding: scaleSize(15),
              borderRadius: scaleSize(5),
              marginTop: scaleSize(10),
            },
          ]}
          onPress={handleSubmit}>
          <Text style={[styles.submitButtonText, { fontSize: scaleFont(16) }]}>
            Submit Application
          </Text>
        </TouchableOpacity>
        {isSubmitting && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#ffffff" />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  contentContainer: {
    flexGrow: 1,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  header: {
    backgroundColor: '#1a5276',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  headerText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionHeader: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  sectionTitle: {
    fontWeight: 'bold',
    color: '#333',
  },
  subSectionTitle: {
    fontWeight: '600',
    color: '#333',
  },
  formRow: {
    width: '100%',
  },
  prefRow: {
    width: '100%',
  },
  label: {
    marginBottom: 5,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
    width: '100%',
  },
  multilineInput: {
    textAlignVertical: 'top',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: scaleSize(10),
  },
  pickerText: {
    textAlign: 'center',
    color: '#333',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '80%',
    maxHeight: '50%',
  },
  modalOption: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    padding: 10,
  },
  modalOptionText: {
    color: '#333',
    textAlign: 'center',
  },
  modalCancel: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    alignItems: 'center',
    padding: 10,
  },
  modalCancelText: {
    color: '#e74c3c',
    fontWeight: 'bold',
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableHeaderCell: {
    flex: 1,
    fontWeight: '600',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
  },
  fileUploadButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
  },
  fileUploadText: {
    color: '#555',
  },
  imagePreviewContainer: {
    alignItems: 'center',
  },
  imagePreviewText: {
    color: '#555',
    marginBottom: scaleSize(5),
  },
  imagePreview: {
    resizeMode: 'contain',
  },
  submitButton: {
    backgroundColor: '#1a5276',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  errorText: {
    color: '#e74c3c',
    fontSize: scaleFont(12),
    marginTop: scaleSize(5),
  },
});

export default MBAAdmissionForm;
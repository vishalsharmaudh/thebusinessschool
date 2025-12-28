import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from './screens/welcome';
import home from './screens/home';
import Facultydetails from './screens/facultydetails';
import PDFViewerScreen from './screens/PDFViewerScreen';
import about from './screens/about';
import GalleryAdmin from './screens/GalleryAdmin';
import QueriesScreen from './screens/QueriesScreen'
import ThankYou from './screens/ThankYou';
import confirm from './screens/confirm'
import thankupdf from './screens/thankupdf'
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import VerifyCodeScreen from './screens/VerifyCodeScreen';
import login from './screens/login';
import AdminDashboard from './screens/AdminDashboard';
import signup from './screens/signup';
import program from './screens/program';
import contact from './screens/contact';
import loginadmin from './screens/loginadmin';
import AdmissionsScreen from './screens/AdmissionsScreen';
import alkadetails from './screens/Faculty/alkadetails'; 
import Amishadetails from './screens/Faculty/Amishadetails'; 
import aubiddetails from './screens/Faculty/aubiddetails';
import vershadetails from './screens/Faculty/vershadetails';
import neeludetails from './screens/Faculty/neeludetails';
import rachnadetails from './screens/Faculty/rachnadetails';
import shelkhadetails from './screens/Faculty/shelkhadetails';
import salonidetails from './screens/Faculty/salonidetails';
import farahdetails from './screens/Faculty/farahdetalis';
import komaldetails from './screens/Faculty/komaldetails';
import rajendradetails from './screens/Faculty/rajendradetails';
import Sameerdetails from './screens/Faculty/Sameerdetails';
import vinaydetail from './screens/Faculty/vinaydetail';
import clickform from './screens/clickform';
import GalleryScreen from './screens/GalleryScreen';
import forgot from './screens/forgot'
import FacultyAdminScreen from './screens/FacultyAdminScreen';
import MBAAdmissionForm from './screens/MBAAdmissionForm'
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WelcomeScreen">
        <Stack.Screen 
          name="WelcomeScreen" 
          component={WelcomeScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="home" 
          component={home} 
          options={{ title: 'Business School' }}
        />
        <Stack.Screen 
          name="GalleryAdmin" 
          component={GalleryAdmin} 
          options={{ title: 'Photos to be Uploaded' }}
        />
        <Stack.Screen
        name="ResetPasswordScreen"
        component={ResetPasswordScreen}
        options={{title: 'Reset Password'}}
        />
        <Stack.Screen
        name="VerifyCodeScreen"
        component={VerifyCodeScreen}
        options={{title: 'Verify Code'}}
        />
        <Stack.Screen 
          name="PDFViewerScreen" 
          component={PDFViewerScreen} 
          options={{ title: 'View PDF' }}
        />
        <Stack.Screen 
          name="FacultyAdminScreen" 
          component={FacultyAdminScreen} 
          options={{ title: 'Edit Faculty Details' }}
        />
        <Stack.Screen 
          name="GalleryScreen" 
          component={GalleryScreen} 
          options={{ title: 'Gallery Section' }}
        />
        <Stack.Screen 
          name="confirm" 
          component={confirm} 
          options={{ title: 'Confirm Password' }}
        />
        <Stack.Screen 
          name="AdmissionsScreen" 
          component={AdmissionsScreen} 
          options={{ title: 'Admission Requests' }}
        />
        <Stack.Screen 
          name="thankupdf" 
          component={thankupdf} 
          options={{ title: 'Pdf' }}
        />
        <Stack.Screen
          name="Facultydetails"
          component={Facultydetails}
          options={{ title: 'Faculty Members' }}
        />
        <Stack.Screen
          name="ThankYou"
          component={ThankYou}
          options={{ title: 'Thank You' }}
        />
        <Stack.Screen
          name="QueriesScreen"
          component={QueriesScreen}
          options={{ title: 'Student Queries' }}
        />
        <Stack.Screen
          name="loginadmin"
          component={loginadmin}
          options={{ title: 'Login As Admin' }}
        />
        <Stack.Screen
          name="about"
          component={about}
          options={{ title: 'About' }}
        />
        <Stack.Screen
          name="AdminDashboard"
          component={AdminDashboard}
          options={{ title: 'Admin Dashboard' }}
        />
        <Stack.Screen
          name="login"
          component={login}
          options={{ title: 'Login' }}
        />
        <Stack.Screen
          name="forgot"
          component={forgot}
          options={{ title: 'Forgot' }}
        />
        <Stack.Screen
          name="clickform"
          component={clickform}
          options={{ title: 'Form' }}
        />
        <Stack.Screen
          name="signup"
          component={signup}
          options={{ title: 'Signup' }}
        />
        <Stack.Screen
          name="MBAAdmissionForm"
          component={MBAAdmissionForm}
          options={{ title: 'AdmissionForm' }}
        />
        <Stack.Screen
          name="program"
          component={program}
          options={{ title: 'Program' }}
        />
        <Stack.Screen
          name="contact"
          component={contact}
          options={{ title: 'Contact' }}
        />
         <Stack.Screen
          name="alkadetails"
          component={alkadetails}
          options={{ title: 'Faculty Members' }}
        />
        <Stack.Screen
          name="Amishadetails"
          component={Amishadetails}
          options={{ title: 'Faculty Members' }}
        />
        <Stack.Screen
          name="aubiddetails"
          component={aubiddetails}
          options={{ title: 'Faculty Members' }}
        />
        <Stack.Screen
          name="vershadetails"
          component={vershadetails}
          options={{ title: 'Faculty Members' }}
        />
        <Stack.Screen
          name="neeludetails"
          component={neeludetails}
          options={{ title: 'Faculty Members' }}
        />
        <Stack.Screen
          name="rachnadetails"
          component={rachnadetails}
          options={{ title: 'Faculty Members' }}
        />
        <Stack.Screen
          name="shelkhadetails"
          component={shelkhadetails}
          options={{ title: 'Faculty Members' }}
        />
        <Stack.Screen
          name="salonidetails"
          component={salonidetails}
          options={{ title: 'Faculty Members' }}
        />
        <Stack.Screen
          name="farahdetails"
          component={farahdetails}
          options={{ title: 'Faculty Members' }}
        />
        <Stack.Screen
          name="komaldetails"
          component={komaldetails}
          options={{ title: 'Faculty Members' }}
        />
         <Stack.Screen
          name="rajendradetails"
          component={rajendradetails}
          options={{ title: 'Faculty Members' }}
        />
        <Stack.Screen
          name="Sameerdetails"
          component={Sameerdetails}
          options={{ title: 'Faculty Members' }}
        />
        <Stack.Screen
          name="vinaydetail"
          component={vinaydetail}
          options={{ title: 'Faculty Members' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

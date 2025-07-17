import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { supabase } from '../supabaseClient'; // Adjust path if needed

export default function PDFViewerScreen({ route }) {
  const { applicationId } = route.params; // Passed from AdmissionsScreen
  const [pdfUrl, setPdfUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPDFUrl = async () => {
      if (!applicationId) {
        setError('Invalid application ID');
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('applications')
        .select('pdf_url')
        .eq('id', applicationId)
        .single();

      if (error || !data?.pdf_url) {
        console.error('Error fetching PDF:', error?.message || 'No PDF found');
        setError('Could not load PDF.');
        setLoading(false);
      } else {
        const publicUrl = `https://zbiugzwvntlavqzfquba.supabase.co/storage/v1/object/public/admission-pdfs/${data.pdf_url}`;
        setPdfUrl(publicUrl);
        setLoading(false);
      }
    };

    fetchPDFUrl();
  }, [applicationId]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (error || !pdfUrl) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: 'red', fontSize: 16 }}>{error || 'Invalid PDF link'}</Text>
      </View>
    );
  }
  const googleViewerUrl = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(pdfUrl)}`;

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: googleViewerUrl }}
        style={styles.webview}
        startInLoadingState
        renderLoading={() => (
          <ActivityIndicator size="large" color="#007bff" style={{ marginTop: 20 }} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  webview: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

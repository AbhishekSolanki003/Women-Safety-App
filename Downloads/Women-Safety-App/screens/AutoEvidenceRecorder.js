// components/AutoEvidenceRecorder.js
import React, { useEffect, useState } from 'react';
import * as MediaLibrary from 'expo-media-library';

const AutoEvidenceRecorder = ({ onRecordingFinished }) => {
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status: mediaStatus } = await MediaLibrary.requestPermissionsAsync();
      setHasPermission(mediaStatus === 'granted');
    })();
  }, []);

  return null; // No UI or camera functionality
};

export default AutoEvidenceRecorder;

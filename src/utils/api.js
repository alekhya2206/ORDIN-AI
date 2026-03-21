window.api = {
  CLAUDE_API_KEY: "dummy_api_key_hidden",
  systemPrompt: `You are a medical report simplifier. Given a medical report, extract all key medical terms, lab values, diagnoses, and medicines. For each term, classify it as Normal, High, Low, or Neutral. Then write a simple layman explanation (as if explaining to a non-medical person). Then give 3–5 simple actionable tips. Finally, if a target language is provided (e.g. Hindi), translate the explanation and tips into that language. Respond ONLY in valid JSON with this structure: { "terms": [{"name": "string", "value": "string", "unit": "string", "status": "Normal"|"High"|"Low"|"Neutral"}], "explanation": ["strings"], "advice": ["strings"], "translated_explanation": ["strings"], "translated_advice": ["strings"] }`,
  fileToBase64: function(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  },
  MOCK_RESPONSE: function(lang) {
    return {
      terms: [
        { name: "Hemoglobin", value: "11.2", unit: "g/dL", status: "Low" },
        { name: "WBC Count", value: "7500", unit: "cells/mcL", status: "Normal" },
        { name: "Cholesterol", value: "240", unit: "mg/dL", status: "High" },
        { name: "Vitamin D", value: "15.0", unit: "ng/mL", status: "Low" },
        { name: "Blood Pressure", value: "120/80", unit: "mmHg", status: "Normal" }
      ],
      explanation: [
        "Your complete blood count shows that your hemoglobin is slightly lower than normal, which suggests mild anemia.",
        "Your white blood cell count is normal, meaning there's no sign of active overall infection.",
        "Your cholesterol levels are elevated, which means there could be a risk to your heart health over a longer period if unmanaged.",
        "Your Vitamin D levels are quite low. This is a common issue that can cause fatigue and bone weakness."
      ],
      advice: [
        "Include more iron-rich foods in your diet, such as spinach, lentils, and red meat, to help boost your hemoglobin.",
        "Reduce your intake of fried foods and saturated fats to better manage your cholesterol.",
        "Try to get 15-20 minutes of early morning sunlight daily, and ask your doctor if you should take a Vitamin D supplement.",
        "Schedule a follow-up with your general physician in 3 months with a fresh lipid profile test."
      ],
      translated_explanation: lang !== 'English' ? [
        `${lang} translation: आपकी पूरी रक्त गणना से पता चलता है कि आपका हीमोग्लोबिन सामान्य से थोड़ा कम है, जो हल्के एनीमिया का सुझाव देता है।`,
        `${lang} translation: आपकी श्वेत रक्त कोशिका की गिनती सामान्य है, जिसका अर्थ है कि कोई सक्रिय समग्र संक्रमण नहीं है।`,
        `${lang} translation: आपका कोलेस्ट्रॉल का स्तर बढ़ा हुआ है, जिसका अर्थ है कि अगर इसे प्रबंधित नहीं किया गया तो लंबी अवधि में आपके हृदय स्वास्थ्य के लिए जोखिम हो सकता है।`,
        `${lang} translation: आपका विटामिन डी स्तर काफी कम है। यह एक आम समस्या है जो थकान और हड्डियों की कमजोरी का कारण बन सकती है।`
      ] : null,
      translated_advice: lang !== 'English' ? [
        `${lang} translation: अपने हीमोग्लोबिन को बढ़ाने में मदद करने के लिए अपने आहार में पालक, दाल और रेड मीट जैसे आयरन युक्त खाद्य पदार्थों को शामिल करें।`,
        `${lang} translation: अपने कोलेस्ट्रॉल का बेहतर प्रबंधन करने के लिए तले हुए खाद्य पदार्थों और संतृप्त वसा का सेवन कम करें।`,
        `${lang} translation: रोजाना 15-20 मिनट सुबह की धूप लेने की कोशिश करें, और अपने डॉक्टर से पूछें कि क्या आपको विटामिन डी सप्लीमेंट लेना चाहिए।`,
        `${lang} translation: एक ताज़ा लिपिड प्रोफ़ाइल परीक्षण के साथ 3 महीने में अपने सामान्य चिकित्सक से संपर्क करें।`
      ] : null
    };
  }
};

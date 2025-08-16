import React, { useState } from 'react';
// import '../src/App.css';

// All symptoms list
const SYMPTOMS = [
  'itching', 'skin_rash', 'nodal_skin_eruptions',
       'continuous_sneezing', 'shivering', 'chills', 'joint_pain',
       'stomach_pain', 'acidity', 'ulcers_on_tongue', 'muscle_wasting',
       'vomiting', 'burning_micturition', 'spotting_ urination',
       'fatigue', 'weight_gain', 'anxiety', 'cold_hands_and_feets',
       'mood_swings', 'weight_loss', 'restlessness', 'lethargy',
       'patches_in_throat', 'irregular_sugar_level', 'cough',
       'high_fever', 'sunken_eyes', 'breathlessness', 'sweating',
       'dehydration', 'indigestion', 'headache', 'yellowish_skin',
       'dark_urine', 'nausea', 'loss_of_appetite', 'pain_behind_the_eyes',
       'back_pain', 'constipation', 'abdominal_pain', 'diarrhoea',
       'mild_fever', 'yellow_urine', 'yellowing_of_eyes',
       'acute_liver_failure', 'fluid_overload', 'swelling_of_stomach',
       'swelled_lymph_nodes', 'malaise', 'blurred_and_distorted_vision',
       'phlegm', 'throat_irritation', 'redness_of_eyes', 'sinus_pressure',
       'runny_nose', 'congestion', 'chest_pain', 'weakness_in_limbs',
       'fast_heart_rate', 'pain_during_bowel_movements',
       'pain_in_anal_region', 'bloody_stool', 'irritation_in_anus',
       'neck_pain', 'dizziness', 'cramps', 'bruising', 'obesity',
       'swollen_legs', 'swollen_blood_vessels', 'puffy_face_and_eyes',
       'enlarged_thyroid', 'brittle_nails', 'swollen_extremeties',
       'excessive_hunger', 'extra_marital_contacts',
       'drying_and_tingling_lips', 'slurred_speech', 'knee_pain',
       'hip_joint_pain', 'muscle_weakness', 'stiff_neck',
       'swelling_joints', 'movement_stiffness', 'spinning_movements',
       'loss_of_balance', 'unsteadiness', 'weakness_of_one_body_side',
       'loss_of_smell', 'bladder_discomfort', 'foul_smell_of urine',
       'continuous_feel_of_urine', 'passage_of_gases', 'internal_itching',
       'toxic_look_(typhos)', 'depression', 'irritability', 'muscle_pain',
       'altered_sensorium', 'red_spots_over_body', 'belly_pain',
       'abnormal_menstruation', 'dischromic _patches',
       'watering_from_eyes', 'increased_appetite', 'polyuria',
       'family_history', 'mucoid_sputum', 'rusty_sputum',
       'lack_of_concentration', 'visual_disturbances',
       'receiving_blood_transfusion', 'receiving_unsterile_injections',
       'coma', 'stomach_bleeding', 'distention_of_abdomen',
       'history_of_alcohol_consumption', 'fluid_overload.1',
       'blood_in_sputum', 'prominent_veins_on_calf', 'palpitations',
       'painful_walking', 'pus_filled_pimples', 'blackheads', 'scurring',
       'skin_peeling', 'silver_like_dusting', 'small_dents_in_nails',
       'inflammatory_nails', 'blister', 'red_sore_around_nose',
       'yellow_crust_ooze'
];

function FormSelect() {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // change handler for symptoms selection
  const toggleSymptom = (symptom) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  // sending to API for prediction
  const handlePredict = async () => {
    if (selectedSymptoms.length === 0) {
      alert("⚠️ You Must select at least one symptom.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms: selectedSymptoms.join(",") }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error:", error);
      setResult({ error: "Something get wrong!" });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          🧑‍⚕️ Disease Prediction
        </h1>

        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Select Symptoms:
        </h2>
        <div className="grid grid-cols-2 gap-3 mb-6">
          {SYMPTOMS.map((symptom, index) => (
            <label
              key={index}
              className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
            >
              <input
                type="checkbox"
                checked={selectedSymptoms.includes(symptom)}
                onChange={() => toggleSymptom(symptom)}
                className="h-4 w-4 text-indigo-600"
              />
              <span className="text-gray-700">{symptom}</span>
            </label>
          ))}
        </div>

        <button
          onClick={handlePredict}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-black font-semibold py-2 rounded-lg transition duration-300"
        >
          {loading ? "Predicting..." : "Predict"}
        </button>

        {result && (
          <div className="mt-6 bg-gray-50 p-4 rounded-lg border">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Result:</h2>
            {result.error ? (
              <p className="text-red-500">{result.error}</p>
            ) : (
              <ul className="space-y-2 text-gray-700">
                <li>
                  🌲 <strong>Random Forest:</strong> {result.rf_model_prediction}
                </li>
                <li>
                  📊 <strong>Naive Bayes:</strong> {result.nb_model_prediction}
                </li>
                <li>
                  📈 <strong>SVM:</strong> {result.svm_model_prediction}
                </li>
                <li className="text-indigo-700 font-bold">
                  ✅ Final Prediction: {result.final_prediction}
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default FormSelect;

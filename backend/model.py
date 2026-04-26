import torch
import torchvision.transforms as transforms
from torchvision import models
from PIL import Image
import json, os

MODEL_PATH = os.path.join(os.path.dirname(__file__), "../model/crop_disease_model.pth")
LABELS_PATH = os.path.join(os.path.dirname(__file__), "../model/labels.json")

TRANSFORM = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
])

# Detailed disease information matching labels.json exactly
DISEASE_INFO = {
    "Pepper__bell___Bacterial_spot": {
        "symptoms": [
            "Small, dark brown spots with yellow halos on leaves",
            "Raised, water-soaked lesions on fruits",
            "Leaf yellowing and premature drop",
            "Stunted plant growth"
        ],
        "treatment": [
            "Remove and destroy all infected plant parts immediately",
            "Apply copper-based bactericide spray on all plant surfaces",
            "Avoid overhead watering - use drip irrigation instead",
            "Disinfect all gardening tools with 10% bleach solution",
            "Increase plant spacing for better air circulation"
        ],
        "prevention": [
            "Use certified disease-free seeds and transplants",
            "Practice 3-year crop rotation with non-host crops",
            "Avoid working with plants when they are wet",
            "Remove plant debris at end of season",
            "Apply preventive copper sprays during humid weather"
        ],
        "fertilizer": {
            "name": "Copper Hydroxide 53.8% WP",
            "dosage": "2-3 grams per liter of water",
            "frequency": "Every 7-10 days",
            "method": "Foliar spray covering both upper and lower leaf surfaces. Apply early morning or evening. Mix with sticker for better adhesion."
        },
        "recovery_time": "2-3 weeks with consistent treatment. New growth should appear healthy. Continue monitoring for 4-6 weeks."
    },
    "Pepper__bell___healthy": {},
    "Potato___Early_blight": {
        "symptoms": [
            "Dark brown spots with concentric rings (target pattern) on older leaves",
            "Yellowing around the spots",
            "Leaf drop starting from bottom of plant",
            "Dark lesions on stems and tubers"
        ],
        "treatment": [
            "Remove all infected lower leaves and destroy them",
            "Apply fungicide containing chlorothalonil or mancozeb",
            "Mulch around plants to prevent soil splash",
            "Water at soil level only, avoid wetting foliage",
            "Improve air circulation by proper spacing"
        ],
        "prevention": [
            "Plant resistant varieties when available",
            "Rotate crops - avoid planting potatoes in same spot for 3 years",
            "Remove volunteer potato plants",
            "Apply organic mulch to prevent spore splash",
            "Start preventive fungicide sprays in early season"
        ],
        "fertilizer": {
            "name": "Mancozeb 75% WP",
            "dosage": "2.5 grams per liter of water",
            "frequency": "Every 7-14 days",
            "method": "Thorough foliar spray ensuring complete coverage. Start applications when plants are 6 inches tall. Reapply after heavy rain."
        },
        "recovery_time": "3-4 weeks. Disease progression will stop within 1 week of treatment. Continue treatment throughout growing season."
    },
    "Potato___Late_blight": {
        "symptoms": [
            "Large, dark brown to black lesions on leaves",
            "White fuzzy growth on undersides of leaves in humid conditions",
            "Rapid blackening and death of entire plant",
            "Brown rot on tubers with foul odor"
        ],
        "treatment": [
            "URGENT: Apply systemic fungicide immediately upon detection",
            "Remove and burn all infected plants if disease is severe",
            "Spray healthy plants preventively",
            "Harvest tubers immediately if plants are dying",
            "Do not store any infected tubers"
        ],
        "prevention": [
            "Plant certified disease-free seed potatoes only",
            "Choose resistant varieties (check local recommendations)",
            "Monitor weather - disease spreads in cool, wet conditions",
            "Apply preventive fungicides before disease appears",
            "Destroy all cull piles and volunteer plants"
        ],
        "fertilizer": {
            "name": "Metalaxyl 8% + Mancozeb 64% WP",
            "dosage": "2.5 grams per liter of water",
            "frequency": "Every 5-7 days during favorable disease conditions",
            "method": "Complete coverage spray including stems. Use high volume spray. Alternate with other fungicide groups to prevent resistance."
        },
        "recovery_time": "Very difficult to recover once infected. Act within 24-48 hours. Focus on protecting healthy plants. Infected plants usually die."
    },
    "Potato___healthy": {},
    "Tomato_Bacterial_spot": {
        "symptoms": [
            "Small, dark, greasy-looking spots on leaves",
            "Raised brown spots on green fruits",
            "Yellow halos around leaf spots",
            "Severe defoliation in advanced stages"
        ],
        "treatment": [
            "Prune and destroy infected leaves and branches",
            "Apply copper-based bactericide weekly",
            "Avoid overhead irrigation completely",
            "Sanitize pruning tools between plants",
            "Remove severely infected plants"
        ],
        "prevention": [
            "Use disease-free transplants and seeds",
            "Avoid touching plants when wet",
            "Practice 2-3 year crop rotation",
            "Use drip irrigation or soaker hoses",
            "Apply copper sprays preventively in humid weather"
        ],
        "fertilizer": {
            "name": "Copper Oxychloride 50% WP",
            "dosage": "3 grams per liter of water",
            "frequency": "Weekly for 3-4 weeks, then every 10 days",
            "method": "Spray to runoff covering all plant parts. Apply when plants are dry. Do not apply during flowering to avoid fruit marking."
        },
        "recovery_time": "2-4 weeks depending on severity. Early detection is crucial. New growth should be symptom-free within 2 weeks."
    },
    "Tomato_Early_blight": {
        "symptoms": [
            "Brown spots with concentric rings on lower leaves",
            "Yellowing and dropping of older leaves",
            "Dark lesions on stems near soil line",
            "Sunken spots on fruits near stem end"
        ],
        "treatment": [
            "Remove infected lower leaves up to first fruit cluster",
            "Apply fungicide containing chlorothalonil",
            "Stake or cage plants for better air flow",
            "Mulch with straw or plastic to prevent soil splash",
            "Water only at base of plants"
        ],
        "prevention": [
            "Choose resistant varieties (check seed catalogs)",
            "Space plants adequately (24-36 inches apart)",
            "Rotate tomatoes with non-solanaceous crops",
            "Remove all plant debris at season end",
            "Apply preventive fungicides starting early season"
        ],
        "fertilizer": {
            "name": "Chlorothalonil 75% WP",
            "dosage": "2 grams per liter of water",
            "frequency": "Every 7-10 days throughout season",
            "method": "Thorough spray coverage of foliage. Begin when plants are established. Increase frequency during wet weather."
        },
        "recovery_time": "3-4 weeks with consistent treatment. Disease can be managed but not cured. Continue treatment until harvest."
    },
    "Tomato_Late_blight": {
        "symptoms": [
            "Large, irregular brown blotches on leaves",
            "White mold on leaf undersides in humid conditions",
            "Greasy-looking brown lesions on stems",
            "Firm brown rot on green and ripe fruits"
        ],
        "treatment": [
            "EMERGENCY: Apply systemic fungicide within 24 hours",
            "Remove all infected plant parts immediately",
            "Increase spacing and improve ventilation",
            "Stop overhead watering completely",
            "Consider removing entire plant if heavily infected"
        ],
        "prevention": [
            "Plant resistant varieties (Mountain Magic, Defiant PHR)",
            "Monitor local late blight alerts and forecasts",
            "Apply preventive fungicides before disease appears",
            "Avoid planting near potatoes",
            "Use row covers to reduce leaf wetness"
        ],
        "fertilizer": {
            "name": "Cymoxanil 8% + Mancozeb 64% WP",
            "dosage": "2 grams per liter of water",
            "frequency": "Every 5-7 days during disease-favorable weather",
            "method": "High-volume spray for complete coverage. Apply preventively. Alternate with different fungicide modes of action."
        },
        "recovery_time": "Extremely difficult. Must act within 24-48 hours of first symptoms. Infected plants rarely recover. Focus on prevention."
    },
    "Tomato_Leaf_Mold": {
        "symptoms": [
            "Pale yellow spots on upper leaf surfaces",
            "Olive-green to brown fuzzy mold on leaf undersides",
            "Leaves curl and become brittle",
            "Severe defoliation in greenhouse conditions"
        ],
        "treatment": [
            "Reduce humidity below 85% (critical)",
            "Increase ventilation and air circulation",
            "Remove infected leaves from bottom up",
            "Apply fungicide containing azoxystrobin",
            "Space plants wider apart"
        ],
        "prevention": [
            "Use resistant varieties (many available)",
            "Ensure excellent greenhouse ventilation",
            "Avoid overhead watering",
            "Maintain humidity below 85%",
            "Remove lower leaves to improve air flow"
        ],
        "fertilizer": {
            "name": "Azoxystrobin 23% SC",
            "dosage": "1 ml per liter of water",
            "frequency": "Every 10-14 days",
            "method": "Spray focusing on leaf undersides. Best applied preventively. Rotate with other fungicide groups every 2-3 applications."
        },
        "recovery_time": "2-3 weeks if humidity is controlled. Disease stops spreading quickly when conditions improve. Monitor humidity constantly."
    },
    "Tomato_Septoria_leaf_spot": {
        "symptoms": [
            "Small, circular spots with dark borders and gray centers",
            "Tiny black dots (fungal structures) in spot centers",
            "Yellowing and dropping of lower leaves first",
            "Progressive defoliation moving up the plant"
        ],
        "treatment": [
            "Remove all infected lower leaves immediately",
            "Apply fungicide containing mancozeb or chlorothalonil",
            "Mulch soil surface to prevent spore splash",
            "Avoid wetting foliage when watering",
            "Improve air circulation around plants"
        ],
        "prevention": [
            "Use disease-free transplants",
            "Mulch heavily to prevent soil splash",
            "Water at soil level only",
            "Practice 3-year crop rotation",
            "Remove all plant debris at season end"
        ],
        "fertilizer": {
            "name": "Mancozeb 75% WP",
            "dosage": "2.5 grams per liter of water",
            "frequency": "Every 7-10 days",
            "method": "Thorough coverage spray. Start when first symptoms appear or preventively. Reapply after rain (>1 inch)."
        },
        "recovery_time": "3-4 weeks. Disease progression stops within 1 week of treatment. Continue preventive spraying throughout season."
    },
    "Tomato_Spider_mites_Two_spotted_spider_mite": {
        "symptoms": [
            "Tiny yellow or white speckles on leaves",
            "Fine webbing on undersides of leaves",
            "Leaves turn bronze or yellow",
            "Severe cases: complete leaf drop and plant death"
        ],
        "treatment": [
            "Spray plants forcefully with water to dislodge mites",
            "Apply miticide or insecticidal soap",
            "Increase humidity around plants",
            "Remove heavily infested leaves",
            "Release predatory mites (Phytoseiulus persimilis)"
        ],
        "prevention": [
            "Monitor plants weekly with hand lens",
            "Avoid water stress - mites thrive on stressed plants",
            "Encourage beneficial insects",
            "Avoid excessive nitrogen fertilization",
            "Use reflective mulches to deter mites"
        ],
        "fertilizer": {
            "name": "Abamectin 1.9% EC",
            "dosage": "0.5 ml per liter of water",
            "frequency": "Every 7 days for 3 weeks",
            "method": "Spray focusing on leaf undersides where mites live. Use high pressure. Rotate with different miticide groups to prevent resistance."
        },
        "recovery_time": "2-3 weeks with proper treatment. Monitor closely for re-infestation. May need multiple treatment cycles."
    },
    "Tomato__Target_Spot": {
        "symptoms": [
            "Brown spots with concentric rings (target pattern)",
            "Spots on leaves, stems, and fruits",
            "Leaves turn yellow and drop",
            "Fruit lesions are sunken and dark"
        ],
        "treatment": [
            "Remove infected leaves and fruits",
            "Apply broad-spectrum fungicide",
            "Improve air circulation by pruning",
            "Avoid overhead watering",
            "Stake plants to keep foliage off ground"
        ],
        "prevention": [
            "Use resistant varieties when available",
            "Practice crop rotation (3 years)",
            "Space plants properly for air flow",
            "Mulch to prevent soil splash",
            "Apply preventive fungicides in humid weather"
        ],
        "fertilizer": {
            "name": "Tebuconazole 25.9% EC",
            "dosage": "1 ml per liter of water",
            "frequency": "Every 10-14 days",
            "method": "Complete coverage spray of all plant parts. Begin at first sign of disease or preventively. Do not exceed label rates."
        },
        "recovery_time": "3-4 weeks with proper fungicide application. Disease can be controlled but requires consistent treatment."
    },
    "Tomato__Tomato_YellowLeaf__Curl_Virus": {
        "symptoms": [
            "Severe upward curling of leaves",
            "Yellowing between leaf veins",
            "Stunted plant growth (plants stay small)",
            "Reduced or no fruit production"
        ],
        "treatment": [
            "NO CURE - Remove infected plants immediately",
            "Control whitefly vectors with insecticides",
            "Use yellow sticky traps to monitor whiteflies",
            "Apply neem oil or insecticidal soap",
            "Protect healthy plants with row covers"
        ],
        "prevention": [
            "Plant resistant varieties (TYLCV resistant hybrids)",
            "Use insect-proof netting in greenhouses",
            "Control whiteflies before planting",
            "Remove weeds that harbor whiteflies",
            "Plant early to avoid peak whitefly populations"
        ],
        "fertilizer": {
            "name": "Imidacloprid 17.8% SL (for whitefly control)",
            "dosage": "0.5 ml per liter of water",
            "frequency": "Every 7-10 days",
            "method": "Spray focusing on leaf undersides where whiteflies feed. Can also apply as soil drench. Rotate with other insecticide groups."
        },
        "recovery_time": "NO RECOVERY POSSIBLE. Virus cannot be cured. Focus on preventing spread to healthy plants and controlling whiteflies."
    },
    "Tomato__Tomato_mosaic_virus": {
        "symptoms": [
            "Mottled light and dark green pattern on leaves",
            "Distorted, fern-like leaves",
            "Stunted plant growth",
            "Reduced fruit yield and quality"
        ],
        "treatment": [
            "NO CURE - Remove and destroy infected plants",
            "Disinfect all tools with 10% bleach solution",
            "Wash hands thoroughly before handling plants",
            "Do not smoke near plants (virus in tobacco)",
            "Remove infected plants in sealed bags"
        ],
        "prevention": [
            "Use certified virus-free seeds and transplants",
            "Plant resistant varieties (TMV resistant)",
            "Disinfect tools between plants",
            "Avoid touching plants unnecessarily",
            "Control aphids which can spread virus"
        ],
        "fertilizer": {
            "name": "No chemical treatment available",
            "dosage": "N/A - Focus on sanitation",
            "frequency": "N/A",
            "method": "Prevention only: Maintain plant health with balanced fertilization. Use 19-19-19 NPK at label rates for general plant vigor."
        },
        "recovery_time": "NO RECOVERY POSSIBLE. Virus persists in plant. Remove infected plants immediately to prevent spread to healthy plants."
    },
    "Tomato_healthy": {},
    
    # Cotton Diseases
    "Cotton___Bacterial_Blight": {
        "symptoms": [
            "Angular, water-soaked spots on leaves",
            "Black arm symptoms on stems and branches",
            "Boll rot with dark lesions",
            "Leaf yellowing and premature defoliation"
        ],
        "treatment": [
            "Remove and destroy infected plant parts",
            "Apply copper-based bactericide spray",
            "Improve field drainage to reduce moisture",
            "Avoid overhead irrigation",
            "Use disease-free seeds for next planting"
        ],
        "prevention": [
            "Plant resistant varieties",
            "Practice 2-3 year crop rotation",
            "Use certified disease-free seeds",
            "Maintain proper plant spacing",
            "Remove crop debris after harvest"
        ],
        "fertilizer": {
            "name": "Copper Oxychloride 50% WP",
            "dosage": "3 grams per liter of water",
            "frequency": "Every 10-14 days",
            "method": "Foliar spray covering all plant surfaces. Apply during early morning or evening. Repeat after heavy rainfall."
        },
        "recovery_time": "3-4 weeks with proper treatment. Early detection is critical. Continue monitoring throughout the season."
    },
    "Cotton___Fusarium_Wilt": {
        "symptoms": [
            "Yellowing of leaves starting from lower branches",
            "Wilting of entire plant even with adequate moisture",
            "Brown discoloration of vascular tissue in stems",
            "Stunted growth and premature plant death"
        ],
        "treatment": [
            "Remove and burn infected plants immediately",
            "Apply systemic fungicide as soil drench",
            "Improve soil drainage",
            "Avoid nitrogen over-fertilization",
            "Solarize soil before next planting"
        ],
        "prevention": [
            "Plant wilt-resistant varieties (most effective)",
            "Practice long crop rotation (4-5 years)",
            "Maintain soil pH between 6.0-6.5",
            "Avoid field flooding",
            "Use disease-free planting material"
        ],
        "fertilizer": {
            "name": "Carbendazim 50% WP",
            "dosage": "2 grams per liter of water",
            "frequency": "Soil drench every 15-20 days",
            "method": "Apply as soil drench around root zone. Can also be used as seed treatment (2g per kg seed). Rotate with other fungicides."
        },
        "recovery_time": "Very difficult to recover once infected. Focus on prevention. Infected plants usually die within 2-3 weeks."
    },
    "Cotton___healthy": {},
    
    # Sugarcane Diseases
    "Sugarcane___Bacterial_Blight": {
        "symptoms": [
            "Long, narrow, water-soaked streaks on leaves",
            "Leaves turn yellow then brown",
            "White bacterial ooze from cut stems",
            "Stunted growth and reduced tillering"
        ],
        "treatment": [
            "Remove and burn infected plants",
            "Apply copper-based bactericide",
            "Use disease-free seed cane",
            "Disinfect cutting tools between plants",
            "Improve field drainage"
        ],
        "prevention": [
            "Plant resistant varieties",
            "Use healthy, disease-free seed cane",
            "Treat seed cane with hot water (50°C for 2 hours)",
            "Avoid mechanical damage during cultivation",
            "Practice crop rotation where possible"
        ],
        "fertilizer": {
            "name": "Copper Oxychloride 50% WP + Streptocycline",
            "dosage": "3g Copper + 0.5g Streptocycline per liter",
            "frequency": "Every 10-15 days",
            "method": "Foliar spray and whorl application. Treat seed cane before planting. Apply during early growth stages."
        },
        "recovery_time": "4-6 weeks if detected early. Severe infections are difficult to control. Focus on using healthy planting material."
    },
    "Sugarcane___Red_Rot": {
        "symptoms": [
            "Reddening and drying of leaves from tips",
            "Red discoloration inside stem with white patches",
            "Sour smell from infected stems",
            "Hollow stems in advanced stages"
        ],
        "treatment": [
            "URGENT: Remove and burn all infected plants",
            "Apply systemic fungicide immediately",
            "Avoid ratoon crop from infected field",
            "Improve field drainage",
            "Harvest healthy canes immediately"
        ],
        "prevention": [
            "Plant resistant varieties (most important)",
            "Use disease-free, healthy seed cane",
            "Treat seed cane with fungicide before planting",
            "Avoid waterlogging in fields",
            "Remove and destroy infected stubbles"
        ],
        "fertilizer": {
            "name": "Carbendazim 50% WP",
            "dosage": "2 grams per liter for spray, 0.1% for sett treatment",
            "frequency": "Seed treatment before planting + foliar spray every 15 days",
            "method": "Dip seed cane in fungicide solution for 30 minutes before planting. Foliar spray during early infection stages."
        },
        "recovery_time": "Very difficult to recover. Disease spreads rapidly. Infected plants should be removed. Focus on prevention and resistant varieties."
    },
    "Sugarcane___healthy": {},
    
    # Wheat Diseases
    "Wheat___Rust": {
        "symptoms": [
            "Orange-brown pustules on leaves and stems",
            "Yellow rust appears as yellow stripes",
            "Black rust appears as dark brown to black pustules",
            "Premature drying and reduced grain filling"
        ],
        "treatment": [
            "Apply systemic fungicide immediately upon detection",
            "Spray propiconazole or tebuconazole",
            "Ensure complete coverage of plant canopy",
            "Repeat application after 10-15 days if needed",
            "Monitor neighboring fields for spread"
        ],
        "prevention": [
            "Plant rust-resistant varieties (check local recommendations)",
            "Avoid early sowing in rust-prone areas",
            "Remove volunteer wheat plants",
            "Apply preventive fungicide sprays",
            "Monitor rust alerts from agricultural department"
        ],
        "fertilizer": {
            "name": "Propiconazole 25% EC",
            "dosage": "1 ml per liter of water",
            "frequency": "Every 10-15 days during disease-favorable conditions",
            "method": "High-volume foliar spray ensuring complete canopy coverage. Apply during early morning or evening. Best results when applied preventively."
        },
        "recovery_time": "2-3 weeks for rust control. Stops disease progression quickly. Continue monitoring for re-infection throughout the season."
    },
    "Wheat___Septoria_Leaf_Spot": {
        "symptoms": [
            "Small, oval, brown spots with yellow halos on leaves",
            "Tiny black dots (pycnidia) visible in spot centers",
            "Lower leaves affected first, progressing upward",
            "Severe defoliation in wet conditions"
        ],
        "treatment": [
            "Apply fungicide containing azoxystrobin or tebuconazole",
            "Remove infected lower leaves if practical",
            "Improve air circulation in dense stands",
            "Avoid overhead irrigation",
            "Apply fungicide at flag leaf stage"
        ],
        "prevention": [
            "Plant resistant or tolerant varieties",
            "Practice crop rotation (2-3 years)",
            "Bury crop residue by deep plowing",
            "Avoid excessive nitrogen fertilization",
            "Maintain proper plant spacing"
        ],
        "fertilizer": {
            "name": "Tebuconazole 25% + Azoxystrobin 50% WG",
            "dosage": "1 gram per liter of water",
            "frequency": "Apply at tillering and flag leaf stages",
            "method": "Thorough foliar spray. Apply preventively before disease appears. Most effective when applied at early growth stages."
        },
        "recovery_time": "3-4 weeks with proper fungicide application. Disease can significantly reduce yield if not controlled early."
    },
    "Wheat___healthy": {}
}

_model = None
_labels = None

def load_model():
    global _model, _labels
    if not os.path.exists(MODEL_PATH):
        return False
    with open(LABELS_PATH) as f:
        _labels = json.load(f)
    _model = models.resnet18(weights=None)
    _model.fc = torch.nn.Linear(_model.fc.in_features, len(_labels))
    _model.load_state_dict(torch.load(MODEL_PATH, map_location="cpu"))
    _model.eval()
    return True

def predict(image_path):
    if _model is None:
        return {"error": "Model not loaded. Please train the model first."}
    img = Image.open(image_path).convert("RGB")
    tensor = TRANSFORM(img).unsqueeze(0)
    with torch.no_grad():
        outputs = _model(tensor)
        probs = torch.softmax(outputs, dim=1)[0]
        confidence, idx = torch.max(probs, 0)
    
    label = _labels[str(idx.item())]
    info = DISEASE_INFO.get(label, {})
    
    result = {
        "disease": label,
        "confidence": round(confidence.item() * 100, 2)
    }
    
    # Add detailed info if disease is not healthy
    if "healthy" not in label.lower():
        result["symptoms"] = info.get("symptoms", ["Information not available"])
        result["treatment"] = info.get("treatment", ["Consult a local agronomist"])
        result["prevention"] = info.get("prevention", ["Follow general crop management practices"])
        result["fertilizer"] = info.get("fertilizer", {
            "name": "Consult agronomist",
            "dosage": "N/A",
            "frequency": "N/A",
            "method": "N/A"
        })
        result["recovery_time"] = info.get("recovery_time", "Varies based on disease severity and treatment.")
    
    return result

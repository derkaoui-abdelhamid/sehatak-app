// 1. قائمة الولايات الـ 58
const wilayas = ["أدرار", "الشلف", "الأغواط", "أم البواقي", "باتنة", "بجاية", "بسكرة", "بشار", "البليدة", "البويرة", "تمنراست", "تبسة", "تلمسان", "تيارت", "تيزي وزو", "الجزائر العاصمة", "الجلفة", "جيجل", "سطيف", "سعيدة", "سكيكدة", "سيدي بلعباس", "عنابة", "قالمة", "قسنطينة", "المدية", "مستغانم", "المسيلة", "معسكر", "ورقلة", "وهران", "البيض", "إليزي", "برج بوعريريج", "بومرداس", "الطارف", "تندوف", "تسمسيلت", "الوادي", "خنشلة", "سوق أهراس", "تيبازة", "ميلة", "عين الدفلى", "النعامة", "عين تموشنت", "غرداية", "غليزان", "تيميمون", "برج باجي مختار", "أولاد جلال", "بني عباس", "عين صالح", "عين قزام", "تقرت", "جانت", "المغير", "المنيعة"];

const citySelect = document.getElementById('city-select');
citySelect.innerHTML = '<option value="">-- اختر ولايتك --</option>';
wilayas.forEach((w, i) => {
    let opt = document.createElement('option');
    opt.value = w;
    opt.textContent = `${i+1} - ${w}`;
    citySelect.appendChild(opt);
});

// 2. قاعدة البيانات الطبية العميقة
const medicalKnowledge = {
    "صداع": {
        title: "تحليل آلام الرأس (Cephalalgia)",
        details: "<b>الاحتمالات:</b> شقيقة (ألم نابض)، صداع توتري (بسبب السهر والقلق)، أو جيوب أنفية. <br><b>ماذا يحدث:</b> تمدد في الأوعية الدموية الدماغية أو تشنج في عضلات الرقبة.",
        remedy: "1. شرب منقوع النعناع الدافئ.<br>2. التدليك بزيت النعناع.<br>3. الإكثار من الماء والابتعاد عن الضوء.",
        mapQuery: "طبيب أعصاب neurologist"
    },
    "معدة": {
        title: "اضطراب الجهاز الهضمي (Gastritis/IBS)",
        details: "<b>الاحتمالات:</b> عسر هضم، قولون عصبي، أو حموضة زائدة. <br><b>الأسباب:</b> عادات غذائية خاطئة أو بكتيريا المعدة.",
        remedy: "1. منقوع قشور الرمان أو الكمون.<br>2. تجنب المقليات والتوابل الحارة.<br>3. شرب الزنجبيل لتهدئة الغثيان.",
        mapQuery: "طبيب جهاز هضمي gastroenterologist"
    },
    "زكام": {
        title: "التهاب الجهاز التنفسي (Influenza)",
        details: "<b>الاحتمالات:</b> نزلات برد أو أنفلونزا موسمية.<br><b>الأعراض:</b> حمى خفيفة، سيلان أنف، وتعب عام.",
        remedy: "1. بخار الكاليتوس (أوراق الكينا).<br>2. ملعقة عسل وليمون.<br>3. الراحة التامة والسوائل الدافئة.",
        mapQuery: "طبيب عام General Practitioner"
    },
    "ظهر": {
        title: "آلام الظهر والمفاصل",
        details: "<b>الاحتمالات:</b> تشنج عضلي أو ضغط على الفقرات.<br><b>نصيحة:</b> تجنب الحركات المفاجئة وحمل الأوزان.",
        remedy: "1. كمادات دافئة على موضع الألم.<br>2. دهن زيت الزيتون والزنجبيل.<br>3. النوم على وضعية مريحة للظهر.",
        mapQuery: "طبيب عظام orthopedist"
    }
};

// 3. المحرك الرئيسي
document.getElementById('analyze-btn').addEventListener('click', () => {
    const city = citySelect.value;
    const input = document.getElementById('symptom-input').value;

    if (!city || !input) return alert("يرجى ملء البيانات أولاً");

    let foundKey = null;
    if (input.match(/(صداع|رأس|شقيقة|دوار)/)) foundKey = "صداع";
    else if (input.match(/(معدة|بطن|حرقان|قولون)/)) foundKey = "معدة";
    else if (input.match(/(زكام|عطس|سعل)/)) foundKey = "زكام";
    else if (input.match(/(ظهر|عظام|رقبة)/)) foundKey = "ظهر";

    const results = document.getElementById('results-container');
    results.classList.remove('hidden');

    if (foundKey) {
        const data = medicalKnowledge[foundKey];
        document.getElementById('diagnosis-text').innerHTML = `<b>${data.title}</b><br><br>${data.details}`;
        document.getElementById('remedy-text').innerHTML = data.remedy;
        document.getElementById('user-city-display').innerText = city;

        const mapsUrl = `https://www.google.com/maps/search/${data.mapQuery}+in+${city}+Algeria`;
        
        document.getElementById('doctors-list').innerHTML = `
            <div style="text-align:center;">
                <p>لقد وجدنا لك أفضل المتخصصين في ولاية <b>${city}</b>:</p>
                <a href="${mapsUrl}" target="_blank" class="maps-btn">📍 ابحث عن أقرب طبيب في الخريطة</a>
            </div>
        `;
    } else {
        document.getElementById('diagnosis-text').innerText = "لم نتمكن من تحديد الحالة بدقة. يرجى مراجعة طبيب عام.";
        document.getElementById('remedy-text').innerText = "اشرب السوائل وراقب حرارتك.";
        const hospitalUrl = `https://www.google.com/maps/search/hospital+in+${city}+Algeria`;
        document.getElementById('doctors-list').innerHTML = `<a href="${hospitalUrl}" target="_blank" class="maps-btn" style="background:#d32f2f;">🏥 ابحث عن أقرب مستشفى في ${city}</a>`;
    }
    
    results.scrollIntoView({ behavior: 'smooth' });
});
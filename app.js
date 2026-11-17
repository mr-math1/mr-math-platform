const questions = [
 {q:"إذا كانت f(x) = x² − 5x + 6، فما جذرا المعادلة؟",a:["1 ، 6","2 ، 3","−2 ، −3","1 ، 5"],c:1,why:"نحلل: x² − 5x + 6 = (x − 2)(x − 3)، ومنه الجذران 2 و3."},
 {q:"ما قيمة مشتقة الدالة f(x) = 3x² − 4x + 7؟",a:["6x − 4","3x − 4","6x + 7","x² − 4"],c:0,why:"باستخدام قاعدة القوة: مشتقة 3x² تساوي 6x، ومشتقة −4x تساوي −4."},
 {q:"ما مجال الدالة f(x) = √(x − 4)؟",a:["x < 4","x ≥ 4","كل الأعداد الحقيقية","x ≤ 4"],c:1,why:"يجب أن يكون ما تحت الجذر غير سالب: x − 4 ≥ 0، أي x ≥ 4."},
 {q:"إذا كان log₂(8) = x، فما قيمة x؟",a:["2","3","4","8"],c:1,why:"لأن 2³ = 8، إذن log₂(8) = 3."},
 {q:"ما قيمة نهاية (x² − 9)/(x − 3) عندما x تؤول إلى 3؟",a:["3","6","9","غير موجودة"],c:1,why:"نحلل البسط إلى (x−3)(x+3)، فتصبح النهاية 3+3 = 6."}
];
let index=0, selected=-1, score=0, locked=false;
const $=id=>document.getElementById(id);
function renderQuestion(){
 const q=questions[index]; selected=-1;locked=false;
 $("qCount").textContent=`السؤال ${index+1} من ${questions.length}`;
 $("question").textContent=q.q;$("score").textContent=score;
 $("progressBar").style.width=((index+1)/questions.length*100)+"%";
 $("answers").innerHTML=q.a.map((a,i)=>`<button class="answer" data-i="${i}"><b>${["أ","ب","ج","د"][i]}.</b> ${a}</button>`).join("");
 $("feedback").textContent="";$("nextBtn").disabled=true;
 $("checkBtn").disabled=false;$("checkBtn").textContent="تحقق من الإجابة";
 document.querySelectorAll(".answer").forEach(b=>b.addEventListener("click",()=>{if(locked)return;selected=+b.dataset.i;document.querySelectorAll(".answer").forEach(x=>x.classList.remove("selected"));b.classList.add("selected")}));
}
$("checkBtn").addEventListener("click",()=>{
 if(locked)return;if(selected<0){$("feedback").textContent="اختر إجابة أولًا.";return}
 locked=true;const q=questions[index],ok=selected===q.c;
 if(ok)score+=10;
 document.querySelectorAll(".answer").forEach((b,i)=>{if(i===q.c)b.classList.add("correct");else if(i===selected)b.classList.add("wrong")});
 $("score").textContent=score;$("feedback").textContent=(ok?"أحسنت! إجابة صحيحة. ":"ليست الإجابة الصحيحة. ")+q.why;
 $("feedback").style.color=ok?"#23845b":"#b54b4b";$("nextBtn").disabled=false;$("checkBtn").disabled=true;
});
$("nextBtn").addEventListener("click",()=>{if(index<questions.length-1){index++;renderQuestion()}else{$("question").textContent=`انتهى التدريب! نتيجتك ${score} من ${questions.length*10}.`;$("answers").innerHTML="";$("feedback").textContent="يمكنك إعادة التدريب لتحسين نتيجتك.";$("nextBtn").disabled=true;$("checkBtn").textContent="إعادة التدريب";$("checkBtn").disabled=false;$("checkBtn").onclick=()=>{index=0;score=0;$("checkBtn").onclick=null;renderQuestion()}}});
renderQuestion();$("year").textContent=new Date().getFullYear();
$("menuBtn").addEventListener("click",()=>$("nav").classList.toggle("open"));
$("startTop").addEventListener("click",()=>document.querySelector("#classes").scrollIntoView({behavior:"smooth"}));
document.querySelectorAll(".class-card").forEach(card=>card.querySelector("button").addEventListener("click",()=>openModal(`<span class="eyebrow">اختيار الصف</span><h3>${card.dataset.grade}</h3><p>تمهيدًا للمرحلة التالية، سنضيف وحدات المنهج والاختبارات الخاصة بهذا الصف. النسخة الحالية تحتوي على نموذج تدريب توضيحي.</p><button class="primary-btn" onclick="document.getElementById('modal').hidden=true;document.getElementById('practice').scrollIntoView({behavior:'smooth'})">جرّب التدريب الآن</button>`)));
function openModal(content){$("modalContent").innerHTML=content;$("modal").hidden=false}
$("closeModal").addEventListener("click",()=>$("modal").hidden=true);
$("modal").addEventListener("click",e=>{if(e.target===$("modal"))$("modal").hidden=true});
document.querySelectorAll(".game-btn").forEach(btn=>btn.addEventListener("click",()=>{
 const type=btn.dataset.game;
 if(type==="timer")openModal(`<span class="eyebrow">تحدي السرعة</span><h3>تحدي الدقيقة</h3><p>استعد! اضغط بدء ثم حاول حل أكبر عدد من العمليات الذهنية خلال 60 ثانية. هذه نسخة أولية قابلة للتطوير.</p><div id="timerValue" style="font-size:42px;color:#b58b3f;font-weight:900">60</div><button class="primary-btn" id="timerStart">ابدأ الآن</button>`);
 if(type==="riddle")openModal(`<span class="eyebrow">لغز رياضي</span><h3>ما العدد التالي؟</h3><p style="font-size:22px;color:#172238">2 ، 6 ، 12 ، 20 ، 30 ، ؟</p><p>فكر في نمط الفروق بين الأعداد.</p><button class="primary-btn" id="showRiddle">إظهار الحل</button><p id="riddleAnswer"></p>`);
 if(type==="cup")openModal(`<span class="eyebrow">لوحة المتصدرين</span><h3>كأس المتفوقين</h3><p>ستظهر هنا نتائج الطلاب وترتيبهم عند إضافة نظام حسابات وقاعدة بيانات للموقع. نتيجتك في التدريب الحالي: <b>${score}</b> نقطة.</p>`);
}));
document.addEventListener("click",e=>{if(e.target.id==="timerStart"){let t=60;e.target.disabled=true;const v=$("timerValue");const timer=setInterval(()=>{t--;v.textContent=t;if(t<=0){clearInterval(timer);v.textContent="انتهى الوقت!"}},1000)}if(e.target.id==="showRiddle")$("riddleAnswer").textContent="الإجابة 42؛ الفروق هي 4، 6، 8، 10، ثم 12."});

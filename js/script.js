// ==========================================
// 1. هيكلة بيانات الطالب (Class & Constructor)
// ==========================================
class Student {
    constructor(id, name, grades, attendance) {
        this.id = id;
        this.name = name;
        this.grades = grades;           // مصفوفة تحتوي على 3 درجات
        this.attendance = attendance;   // نسبة الحضور (نسبة مئوية)
    }

    // ==========================================
    // 2. دوال التحليل الأكاديمي (Methods)
    // ==========================================

    // دالة حساب المتوسط باستخدام reduce
    calculateAverage() {
        const totalSum = this.grades.reduce((acc, grade) => acc + grade, 0);
        return totalSum / this.grades.length;
    }

    // دالة تحديد التقدير بالحروف
    getGradeLetter(avg) {
        if (avg >= 90) return 'A';
        if (avg >= 80) return 'B';
        if (avg >= 70) return 'C';
        if (avg >= 60) return 'D';
        if (avg >= 50) return 'E';
        return 'F';
    }

    // دالة النتيجة النهائية (تتحقق من المتوسط ونسبة الحضور معاً)
    getFinalResult() {
        const avg = this.calculateAverage();
        if (avg >= 50 && this.attendance >= 75) {
            return "ناجح";
        } else {
            return "يحتاج مراجعة";
        }
    }
}

// ==========================================
// 3. نظام تشغيل الجامعة (Objects Array)
// ==========================================
const studentsList = [
    new Student(101, "أحمد محمود", [85, 90, 95], 90),   // متفوق
    new Student(102, "سارة علي", [40, 45, 50], 80),      // متعثرة (المتوسط: 45)
    new Student(103, "عمر خالد", [42, 44, 46], 70),      // متعثر وغياب (المتوسط: 44)
    new Student(104, "منى يوسف", [70, 75, 80], 85)       // متوسطة
];

// ==========================================
// 4. لجنة الرأفة (Array Methods)
// ==========================================

// 1. الاستخراج: طلاب متوسطاتهم بين 40 و 49
const strugglingStudents = studentsList.filter(student => {
    const avg = student.calculateAverage();
    return avg >= 40 && avg <= 49;
});

// 2. المعالجة: إضافة 5 درجات رأفة لمتوسط الطلاب المتعثرين
const boostedStudents = strugglingStudents.map(student => {
    const originalAvg = student.calculateAverage();
    const newAvg = originalAvg + 5;
    return {
        id: student.id,
        name: student.name,
        originalAverage: originalAvg,
        boostedAverage: newAvg,
        gradeLetter: student.getGradeLetter(newAvg),
        attendance: student.attendance
    };
});

// 3. التحليل: جمع المتوسطات الجديدة باستخدام reduce
const totalBoostedAverage = boostedStudents.reduce((acc, student) => acc + student.boostedAverage, 0);

// 4. متوسط الرأفة العام (مع إضافة درع حماية لمنع القسمة على صفر)
const strugglingCount = boostedStudents.length;
const averageStrugglingScore = strugglingCount > 0 ? (totalBoostedAverage / strugglingCount) : 0;

// ==========================================
// 5. المخرجات (Console Logging)
// ==========================================

console.log("==========================================");
console.log("📜 تقرير كافة الطلاب في النظام:");
console.log("==========================================");

studentsList.forEach(student => {
    const avg = student.calculateAverage();
    console.log(`الاسم: ${student.name}`);
    console.log(`المتوسط: ${avg.toFixed(2)}`);
    console.log(`التقدير: ${student.getGradeLetter(avg)}`);
    console.log(`النتيجة: ${student.getFinalResult()}`);
    console.log("------------------------------------------");
});

console.log("\n==========================================");
console.log("🛠️ مصفوفة الطلاب المتعثرين المشمولين بالرأفة (بعد إضافة 5 درجات):");
console.log("==========================================");
console.table(boostedStudents);

console.log("\n==========================================");
console.log("📊 المتوسط العام للطلاب المتعثرين بعد التعديل:");
console.log("==========================================");
console.log(`المتوسط العام: ${averageStrugglingScore.toFixed(2)}`);
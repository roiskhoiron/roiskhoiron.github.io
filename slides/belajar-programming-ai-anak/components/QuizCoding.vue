<template>
  <div class="quiz-card">
    <h3>{{ soal.pertanyaan }}</h3>
    <div class="options">
      <button
        v-for="(opsi, idx) in soal.pilihan"
        :key="idx"
        class="quiz-option"
        :class="{
          correct: jawabanTerpilih && idx === soal.jawabanBenar,
          wrong: jawabanTerpilih && idx === jawabanUser && idx !== soal.jawabanBenar
        }"
        :disabled="jawabanTerpilih !== null"
        @click="pilihJawaban(idx)"
      >
        {{ opsi }}
      </button>
    </div>
    <transition name="fade">
      <div v-if="jawabanTerpilih !== null" class="feedback">
        <p v-if="jawabanTerpilih === soal.jawabanBenar">
          ✅ Benar! {{ soal.feedbackBenar }}
        </p>
        <p v-else>
          ❌ Belum tepat. {{ soal.feedbackSalah }}
        </p>
        <button class="next-btn" @click="$emit('next')">
          Soal Berikutnya →
        </button>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  soal: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['next'])

const jawabanTerpilih = ref(null)
const jawabanUser = ref(null)

function pilihJawaban(idx) {
  jawabanUser.value = idx
  jawabanTerpilih.value = idx
}
</script>

<style scoped>
.quiz-card {
  background: linear-gradient(135deg, #f0f4ff, #fff5e6);
  border-radius: 20px;
  padding: 28px;
  margin: 16px 0;
  box-shadow: 0 6px 20px rgba(0,85,255,0.12);
}
.quiz-card h3 {
  font-size: 1.3em;
  margin-bottom: 20px;
  color: #1a1a2e;
  line-height: 1.4;
}
.options {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.quiz-option {
  padding: 14px 20px;
  border: 2.5px solid #dce4f4;
  border-radius: 14px;
  background: white;
  font-size: 1.05em;
  font-family: 'Nunito', 'Plus Jakarta Sans', sans-serif;
  font-weight: 600;
  cursor: pointer;
  text-align: left;
  transition: all 0.25s ease;
  position: relative;
}
.quiz-option:hover:not(:disabled) {
  border-color: #3d8bff;
  background: #eaf1ff;
  transform: translateX(4px);
}
.quiz-option.correct {
  border-color: #06d6a0;
  background: #e6faf4;
  color: #0a7c5a;
}
.quiz-option.wrong {
  border-color: #ef476f;
  background: #fde8ed;
  color: #a0304c;
}
.quiz-option:disabled {
  cursor: default;
}
.feedback {
  margin-top: 20px;
  padding: 16px 20px;
  border-radius: 14px;
  background: #fff;
  border: 2px solid #dce4f4;
  font-size: 1.05em;
}
.feedback p {
  margin: 0 0 12px 0;
  font-weight: 600;
}
.next-btn {
  display: inline-block;
  padding: 10px 28px;
  background: linear-gradient(135deg, #3d8bff, #7b2cbf);
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 1em;
  font-family: 'Nunito', 'Plus Jakarta Sans', sans-serif;
  font-weight: 700;
  transition: all 0.2s ease;
}
.next-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(61,139,255,0.4);
}
.fade-enter-active {
  transition: opacity 0.4s ease, transform 0.3s ease;
}
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.fade-leave-to {
  opacity: 0;
}
</style>

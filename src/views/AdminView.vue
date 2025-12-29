<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { api } from '../config/api';

// --- TABS CONFIG ---
const activeTab = ref<'projects' | 'certificates' | 'publications'>('projects');

// --- STATE DATA ---
const projects = ref<any[]>([]);
const certificates = ref<any[]>([]);
const publications = ref<any[]>([]);

const isLoading = ref(false);
const isSubmitting = ref(false);

// --- FORMS STATE ---
const projectForm = ref({
  title: '', description: '', repo_url: '', demo_url: '', tags: '', image: null as File | null
});

const certForm = ref({
  title: '', issuer: '', image: null as File | null, pdf: null as File | null
});

const pubForm = ref({
  title: '', type: 'Artikel', description: '', link: ''
});

// --- FETCH DATA ---
const fetchData = async () => {
  isLoading.value = true;
  try {
    const [projRes, certRes, pubRes] = await Promise.all([
      api.get('/projects'),
      api.get('/certificates'),
      api.get('/publications')
    ]);
    projects.value = projRes.data.data;
    certificates.value = certRes.data.data;
    publications.value = pubRes.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    alert('Gagal mengambil data. Cek console.');
  } finally {
    isLoading.value = false;
  }
};

// --- HANDLERS PROJECT ---
const handleProjectFile = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files?.[0]) projectForm.value.image = target.files[0];
};

const submitProject = async () => {
  isSubmitting.value = true;
  try {
    const fd = new FormData();
    fd.append('title', projectForm.value.title);
    fd.append('description', projectForm.value.description);
    fd.append('repo_url', projectForm.value.repo_url);
    fd.append('demo_url', projectForm.value.demo_url);
    fd.append('tags', projectForm.value.tags);
    if (projectForm.value.image) fd.append('image', projectForm.value.image);

    await api.post('/projects', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
    alert('Project Berhasil! 🚀');
    projectForm.value = { title: '', description: '', repo_url: '', demo_url: '', tags: '', image: null };
    fetchData();
  } catch (e) { alert('Gagal submit project'); console.error(e); } 
  finally { isSubmitting.value = false; }
};

const deleteItem = async (endpoint: string, id: number) => {
  if (!confirm('Yakin hapus?')) return;
  try {
    await api.delete(`/${endpoint}/${id}`);
    fetchData();
  } catch (e) { alert('Gagal hapus'); }
};

// --- HANDLERS CERTIFICATE ---
const handleCertImage = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files?.[0]) certForm.value.image = target.files[0];
};
const handleCertPdf = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files?.[0]) certForm.value.pdf = target.files[0];
};

const submitCertificate = async () => {
  isSubmitting.value = true;
  try {
    const fd = new FormData();
    fd.append('title', certForm.value.title);
    fd.append('issuer', certForm.value.issuer);
    if (certForm.value.image) fd.append('image', certForm.value.image);
    if (certForm.value.pdf) fd.append('pdf', certForm.value.pdf);

    await api.post('/certificates', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
    alert('Sertifikat Berhasil! 🎓');
    certForm.value = { title: '', issuer: '', image: null, pdf: null };
    fetchData();
  } catch (e) { alert('Gagal submit sertifikat'); console.error(e); }
  finally { isSubmitting.value = false; }
};

// --- HANDLERS PUBLICATION ---
const submitPublication = async () => {
  isSubmitting.value = true;
  try {
    // Publikasi cuma JSON, gak perlu FormData
    await api.post('/publications', pubForm.value);
    alert('Publikasi Berhasil! 📚');
    pubForm.value = { title: '', type: 'Artikel', description: '', link: '' };
    fetchData();
  } catch (e) { alert('Gagal submit publikasi'); console.error(e); }
  finally { isSubmitting.value = false; }
};

onMounted(fetchData);
</script>

<template>
  <div class="min-h-screen bg-brand-bg text-brand-text p-6 md:p-12 pt-24">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-fuchsia-500">
        Dashboard Admin 🚀
      </h1>

      <div class="flex gap-4 mb-8 border-b border-zinc-700 pb-2 overflow-x-auto">
        <button 
          @click="activeTab = 'projects'"
          :class="['px-4 py-2 rounded-lg transition-colors', activeTab === 'projects' ? 'bg-brand-primary text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-800']"
        >Projects</button>
        <button 
          @click="activeTab = 'certificates'"
          :class="['px-4 py-2 rounded-lg transition-colors', activeTab === 'certificates' ? 'bg-brand-primary text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-800']"
        >Certificates</button>
        <button 
          @click="activeTab = 'publications'"
          :class="['px-4 py-2 rounded-lg transition-colors', activeTab === 'publications' ? 'bg-brand-primary text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-800']"
        >Publications</button>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div class="lg:col-span-1">
          <div class="bg-brand-surface border border-zinc-700 rounded-2xl p-6 sticky top-24">
            
            <form v-if="activeTab === 'projects'" @submit.prevent="submitProject" class="space-y-4">
              <h2 class="text-xl font-semibold mb-4 text-white">Tambah Project</h2>
              <input v-model="projectForm.title" placeholder="Judul Project" class="admin-input" required>
              <textarea v-model="projectForm.description" placeholder="Deskripsi" rows="3" class="admin-input" required></textarea>
              <input v-model="projectForm.tags" placeholder="Tags (Vue, JS)" class="admin-input">
              <input v-model="projectForm.repo_url" placeholder="Repo URL" class="admin-input">
              <input v-model="projectForm.demo_url" placeholder="Demo URL" class="admin-input">
              <div class="space-y-1">
                <label class="text-xs text-zinc-500">Gambar Project</label>
                <input @change="handleProjectFile" type="file" accept="image/*" class="admin-file">
              </div>
              <button type="submit" :disabled="isSubmitting" class="admin-btn">Simpan Project</button>
            </form>

            <form v-if="activeTab === 'certificates'" @submit.prevent="submitCertificate" class="space-y-4">
              <h2 class="text-xl font-semibold mb-4 text-white">Tambah Sertifikat</h2>
              <input v-model="certForm.title" placeholder="Judul Sertifikat" class="admin-input" required>
              <input v-model="certForm.issuer" placeholder="Penerbit (Ex: Udemy)" class="admin-input" required>
              <div class="space-y-1">
                <label class="text-xs text-zinc-500">Gambar Thumbnail</label>
                <input @change="handleCertImage" type="file" accept="image/*" class="admin-file">
              </div>
              <div class="space-y-1">
                <label class="text-xs text-zinc-500">File PDF</label>
                <input @change="handleCertPdf" type="file" accept="application/pdf" class="admin-file">
              </div>
              <button type="submit" :disabled="isSubmitting" class="admin-btn">Simpan Sertifikat</button>
            </form>

            <form v-if="activeTab === 'publications'" @submit.prevent="submitPublication" class="space-y-4">
              <h2 class="text-xl font-semibold mb-4 text-white">Tambah Publikasi</h2>
              <input v-model="pubForm.title" placeholder="Judul Tulisan" class="admin-input" required>
              <select v-model="pubForm.type" class="admin-input bg-brand-bg">
                <option value="Artikel">Artikel</option>
                <option value="Buku">Buku</option>
              </select>
              <textarea v-model="pubForm.description" placeholder="Deskripsi Singkat" rows="3" class="admin-input"></textarea>
              <input v-model="pubForm.link" placeholder="Link URL" class="admin-input">
              <button type="submit" :disabled="isSubmitting" class="admin-btn">Simpan Publikasi</button>
            </form>

          </div>
        </div>

        <div class="lg:col-span-2 space-y-4">
          
          <div v-if="activeTab === 'projects'">
            <div v-for="item in projects" :key="item.id" class="admin-card group">
              <img v-if="item.image_url" :src="item.image_url" class="w-16 h-16 rounded object-cover bg-zinc-800">
              <div class="flex-grow">
                <h3 class="font-bold text-white">{{ item.title }}</h3>
                <p class="text-sm text-zinc-400 line-clamp-1">{{ item.description }}</p>
              </div>
              <button @click="deleteItem('projects', item.id)" class="delete-btn">🗑️</button>
            </div>
          </div>

          <div v-if="activeTab === 'certificates'">
            <div v-for="item in certificates" :key="item.id" class="admin-card group">
              <img v-if="item.image_url" :src="item.image_url" class="w-16 h-16 rounded object-cover bg-zinc-800">
              <div class="flex-grow">
                <h3 class="font-bold text-white">{{ item.title }}</h3>
                <p class="text-sm text-zinc-400">{{ item.issuer }}</p>
                <a v-if="item.pdf_url" :href="item.pdf_url" target="_blank" class="text-xs text-brand-primary hover:underline">Lihat PDF</a>
              </div>
              <button @click="deleteItem('certificates', item.id)" class="delete-btn">🗑️</button>
            </div>
          </div>

          <div v-if="activeTab === 'publications'">
            <div v-for="item in publications" :key="item.id" class="admin-card group">
              <div class="flex-grow">
                <div class="flex items-center gap-2">
                  <span class="text-xs px-2 py-0.5 bg-brand-primary/20 text-brand-primary rounded">{{ item.type }}</span>
                  <h3 class="font-bold text-white">{{ item.title }}</h3>
                </div>
                <p class="text-sm text-zinc-400 mt-1">{{ item.description }}</p>
              </div>
              <button @click="deleteItem('publications', item.id)" class="delete-btn">🗑️</button>
            </div>
          </div>

          <div v-if="isLoading" class="text-center py-10 text-zinc-500">Loading data...</div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
/* Utility Classes biar kodingan template gak penuh */
.admin-input {
  @apply w-full bg-brand-bg border border-zinc-700 rounded-lg p-2 focus:border-brand-primary outline-none transition-colors text-white;
}
.admin-file {
  @apply w-full text-sm text-brand-subtext file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-primary/10 file:text-brand-primary hover:file:bg-brand-primary/20;
}
.admin-btn {
  @apply w-full bg-brand-primary hover:bg-brand-primary-dark text-white font-bold py-2 px-4 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed;
}
.admin-card {
  @apply bg-brand-surface border border-zinc-700/50 p-4 rounded-xl flex gap-4 items-center hover:border-brand-primary/30 transition-colors;
}
.delete-btn {
  @apply p-2 text-red-400 hover:text-white bg-brand-bg rounded-lg border border-zinc-700 hover:bg-red-500/20 hover:border-red-500 transition-all opacity-0 group-hover:opacity-100;
}
</style>
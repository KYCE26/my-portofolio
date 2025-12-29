<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { api } from '../config/api';

// --- SECURITY CONFIG ---
const SECRET_CODE = '98426';
const isAuthenticated = ref(false);
const inputCode = ref('');
const authError = ref(false);

// --- TABS & STATE ---
const activeTab = ref<'projects' | 'certificates' | 'publications'>('projects');
const projects = ref<any[]>([]);
const certificates = ref<any[]>([]);
const publications = ref<any[]>([]);

const isLoading = ref(false);
const isSubmitting = ref(false);

// --- FORMS STATE ---
const projectForm = ref({ title: '', description: '', repo_url: '', demo_url: '', tags: '', image: null as File | null });
const certForm = ref({ title: '', issuer: '', image: null as File | null, pdf: null as File | null });
const pubForm = ref({ title: '', type: 'Artikel', description: '', link: '' });

// --- AUTH LOGIC ---
const checkAuth = () => {
  if (inputCode.value === SECRET_CODE) {
    isAuthenticated.value = true;
    sessionStorage.setItem('isAdmin', 'true'); 
    fetchData();
  } else {
    authError.value = true;
    inputCode.value = '';
    setTimeout(() => authError.value = false, 2000);
  }
};

const logout = () => {
  isAuthenticated.value = false;
  sessionStorage.removeItem('isAdmin');
  inputCode.value = '';
};

// --- API ACTIONS ---
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
    alert('Gagal mengambil data. Cek koneksi Railway.');
  } finally {
    isLoading.value = false;
  }
};

// --- SUBMIT HANDLERS ---
// Project
const handleProjectFile = (e: Event) => { const t = e.target as HTMLInputElement; if (t.files?.[0]) projectForm.value.image = t.files[0]; };
const submitProject = async () => {
  isSubmitting.value = true;
  try {
    const fd = new FormData();
    fd.append('title', projectForm.value.title); fd.append('description', projectForm.value.description);
    fd.append('repo_url', projectForm.value.repo_url); fd.append('demo_url', projectForm.value.demo_url);
    fd.append('tags', projectForm.value.tags);
    if (projectForm.value.image) fd.append('image', projectForm.value.image);
    await api.post('/projects', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
    projectForm.value = { title: '', description: '', repo_url: '', demo_url: '', tags: '', image: null }; fetchData();
  } catch (e) { alert('Gagal submit'); } finally { isSubmitting.value = false; }
};

// Certificate
const handleCertImage = (e: Event) => { const t = e.target as HTMLInputElement; if (t.files?.[0]) certForm.value.image = t.files[0]; };
const handleCertPdf = (e: Event) => { const t = e.target as HTMLInputElement; if (t.files?.[0]) certForm.value.pdf = t.files[0]; };
const submitCertificate = async () => {
  isSubmitting.value = true;
  try {
    const fd = new FormData();
    fd.append('title', certForm.value.title); fd.append('issuer', certForm.value.issuer);
    if (certForm.value.image) fd.append('image', certForm.value.image);
    if (certForm.value.pdf) fd.append('pdf', certForm.value.pdf);
    await api.post('/certificates', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
    certForm.value = { title: '', issuer: '', image: null, pdf: null }; fetchData();
  } catch (e) { alert('Gagal submit'); } finally { isSubmitting.value = false; }
};

// Publication
const submitPublication = async () => {
  isSubmitting.value = true;
  try {
    await api.post('/publications', pubForm.value);
    pubForm.value = { title: '', type: 'Artikel', description: '', link: '' }; fetchData();
  } catch (e) { alert('Gagal submit'); } finally { isSubmitting.value = false; }
};

// Delete Global
const deleteItem = async (endpoint: string, id: number) => {
  if (!confirm('Yakin hapus data ini?')) return;
  try { await api.delete(`/${endpoint}/${id}`); fetchData(); } catch (e) { alert('Gagal hapus'); }
};

// --- LIFECYCLE ---
onMounted(() => {
  const sessionAuth = sessionStorage.getItem('isAdmin');
  if (sessionAuth === 'true') {
    isAuthenticated.value = true;
    fetchData();
  }
});
</script>

<template>
  <div class="min-h-screen bg-[#050505] text-zinc-200 relative overflow-x-hidden font-sans selection:bg-brand-primary/30 selection:text-brand-primary">
    
    <transition name="fade">
      <div v-if="!isAuthenticated" class="fixed inset-0 z-50 flex items-center justify-center bg-black">
        <div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(#333 1px, transparent 1px); background-size: 30px 30px;"></div>
        
        <div class="relative w-full max-w-md p-8 bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-3xl shadow-2xl flex flex-col items-center">
          <div class="w-20 h-20 bg-zinc-800/80 rounded-2xl flex items-center justify-center mb-6 ring-4 ring-black shadow-inner">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-brand-primary"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </div>
          
          <h2 class="text-2xl font-bold text-white mb-2">Restricted Area</h2>
          <p class="text-zinc-500 text-sm mb-8 text-center">Masukkan kode otentikasi untuk mengakses panel admin.</p>

          <form @submit.prevent="checkAuth" class="w-full space-y-4">
            <div class="relative">
              <input 
                v-model="inputCode" 
                type="password" 
                placeholder="ACCESS CODE" 
                class="w-full text-center text-xl tracking-[0.5em] font-mono bg-black/50 border border-zinc-700 focus:border-brand-primary rounded-xl p-4 text-white outline-none transition-all duration-300 focus:ring-2 focus:ring-brand-primary/20"
                autofocus
              >
            </div>
            
            <button 
              type="submit" 
              class="w-full bg-brand-primary hover:bg-brand-primary-light text-white font-bold py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-brand-primary/20 active:scale-95"
            >
              AUTHENTICATE
            </button>
          </form>

          <p v-if="authError" class="mt-4 text-red-500 font-bold text-sm animate-pulse flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            ACCESS DENIED
          </p>

          <router-link to="/" class="mt-8 text-xs text-zinc-600 hover:text-white transition-colors">
            ← Kembali ke Public Home
          </router-link>
        </div>
      </div>
    </transition>

    <div v-if="isAuthenticated" class="p-6 lg:p-10 max-w-7xl mx-auto">
      
      <header class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-fuchsia-500 mb-1">
            Command Center
          </h1>
          <p class="text-zinc-500 text-sm">Selamat datang kembali, Admin.</p>
        </div>
        <button @click="logout" class="px-5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-400 hover:text-white hover:bg-red-500/10 hover:border-red-500/50 transition-all text-sm font-medium flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          Terminate Session
        </button>
      </header>

      <div class="flex p-1 bg-zinc-900/80 backdrop-blur border border-zinc-800 rounded-xl mb-8 w-full md:w-fit">
        <button 
          v-for="tab in ['projects', 'certificates', 'publications']" 
          :key="tab"
          @click="activeTab = tab as any"
          class="flex-1 md:flex-none px-6 py-2.5 rounded-lg text-sm font-medium capitalize transition-all duration-300 relative overflow-hidden"
          :class="activeTab === tab ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20' : 'text-zinc-400 hover:text-white hover:bg-white/5'"
        >
          {{ tab }}
        </button>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <div class="lg:col-span-4 xl:col-span-3">
          <div class="sticky top-8 bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6 shadow-xl">
            <h2 class="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <span class="w-2 h-6 bg-brand-primary rounded-full"></span>
              Input New Data
            </h2>

            <form v-if="activeTab === 'projects'" @submit.prevent="submitProject" class="space-y-4">
              <input v-model="projectForm.title" placeholder="Judul Project" class="glass-input" required>
              <textarea v-model="projectForm.description" placeholder="Deskripsi Singkat" rows="4" class="glass-input" required></textarea>
              <input v-model="projectForm.tags" placeholder="Tags (Vue, TypeScript)" class="glass-input">
              <div class="grid grid-cols-2 gap-3">
                <input v-model="projectForm.repo_url" placeholder="Repo URL" class="glass-input text-xs">
                <input v-model="projectForm.demo_url" placeholder="Demo URL" class="glass-input text-xs">
              </div>
              <div class="space-y-1">
                <label class="text-[10px] uppercase tracking-wider text-zinc-500 font-bold ml-1">Thumbnail</label>
                <input @change="handleProjectFile" type="file" accept="image/*" class="glass-file">
              </div>
              <button type="submit" :disabled="isSubmitting" class="glass-btn">
                {{ isSubmitting ? 'Uploading...' : 'Deploy Project 🚀' }}
              </button>
            </form>

            <form v-if="activeTab === 'certificates'" @submit.prevent="submitCertificate" class="space-y-4">
              <input v-model="certForm.title" placeholder="Nama Sertifikat" class="glass-input" required>
              <input v-model="certForm.issuer" placeholder="Penerbit (Google, Udemy)" class="glass-input" required>
              <div class="space-y-1">
                <label class="text-[10px] uppercase tracking-wider text-zinc-500 font-bold ml-1">Gambar Preview</label>
                <input @change="handleCertImage" type="file" accept="image/*" class="glass-file">
              </div>
              <div class="space-y-1">
                <label class="text-[10px] uppercase tracking-wider text-zinc-500 font-bold ml-1">Dokumen PDF</label>
                <input @change="handleCertPdf" type="file" accept="application/pdf" class="glass-file">
              </div>
              <button type="submit" :disabled="isSubmitting" class="glass-btn">
                {{ isSubmitting ? 'Uploading...' : 'Save Certificate 🎓' }}
              </button>
            </form>

            <form v-if="activeTab === 'publications'" @submit.prevent="submitPublication" class="space-y-4">
              <input v-model="pubForm.title" placeholder="Judul Tulisan" class="glass-input" required>
              <div class="relative">
                <select v-model="pubForm.type" class="glass-input appearance-none cursor-pointer">
                  <option value="Artikel">Artikel</option>
                  <option value="Buku">Buku</option>
                </select>
                <div class="absolute right-3 top-3 pointer-events-none text-zinc-500">▼</div>
              </div>
              <textarea v-model="pubForm.description" placeholder="Deskripsi Singkat" rows="3" class="glass-input"></textarea>
              <input v-model="pubForm.link" placeholder="Link URL" class="glass-input">
              <button type="submit" :disabled="isSubmitting" class="glass-btn">
                {{ isSubmitting ? 'Saving...' : 'Publish Now 📚' }}
              </button>
            </form>

          </div>
        </div>

        <div class="lg:col-span-8 xl:col-span-9">
          
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-lg font-semibold text-white">Database Records</h2>
            <div v-if="isLoading" class="flex items-center gap-2 text-xs text-brand-primary animate-pulse">
              <span class="w-2 h-2 bg-brand-primary rounded-full"></span> Syncing...
            </div>
          </div>

          <transition-group name="list" tag="div" class="grid grid-cols-1 md:grid-cols-2 gap-4" v-if="activeTab === 'projects'">
            <div v-for="item in projects" :key="item.id" class="glass-card group">
              <div class="relative h-40 overflow-hidden">
                <img v-if="item.image_url" :src="item.image_url" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                <div v-else class="w-full h-full bg-zinc-800 flex items-center justify-center text-zinc-600 text-xs">No Image</div>
                <div class="absolute top-2 right-2 flex gap-1">
                   <button @click="deleteItem('projects', item.id)" class="p-2 bg-black/50 backdrop-blur hover:bg-red-500 text-white rounded-lg transition-colors">🗑️</button>
                </div>
              </div>
              <div class="p-4">
                <h3 class="font-bold text-white mb-1 truncate">{{ item.title }}</h3>
                <p class="text-xs text-zinc-400 line-clamp-2">{{ item.description }}</p>
                <div class="mt-3 flex flex-wrap gap-1">
                   <span v-for="tag in item.tags" :key="tag" class="text-[10px] px-1.5 py-0.5 bg-zinc-800 rounded text-zinc-300 border border-zinc-700">{{ tag }}</span>
                </div>
              </div>
            </div>
          </transition-group>

          <transition-group name="list" tag="div" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" v-if="activeTab === 'certificates'">
            <div v-for="item in certificates" :key="item.id" class="glass-card p-4 flex gap-4 items-center group">
              <img v-if="item.image_url" :src="item.image_url" class="w-16 h-16 rounded-lg object-cover bg-zinc-800 border border-zinc-700">
              <div class="flex-grow min-w-0">
                <h3 class="font-bold text-white text-sm truncate">{{ item.title }}</h3>
                <p class="text-xs text-brand-primary">{{ item.issuer }}</p>
                <a v-if="item.pdf_url" :href="item.pdf_url" target="_blank" class="text-[10px] text-zinc-500 hover:text-white underline mt-1 block">View PDF</a>
              </div>
              <button @click="deleteItem('certificates', item.id)" class="p-2 text-zinc-500 hover:text-red-500 transition-colors">🗑️</button>
            </div>
          </transition-group>

          <transition-group name="list" tag="div" class="space-y-3" v-if="activeTab === 'publications'">
            <div v-for="item in publications" :key="item.id" class="glass-card p-4 flex items-center justify-between group">
              <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-full flex items-center justify-center bg-zinc-800 border border-zinc-700 text-brand-primary">
                  {{ item.type === 'Buku' ? '📖' : '📄' }}
                </div>
                <div>
                  <h3 class="font-bold text-white">{{ item.title }}</h3>
                  <p class="text-xs text-zinc-400">{{ item.description }}</p>
                </div>
              </div>
              <button @click="deleteItem('publications', item.id)" class="p-2 text-zinc-500 hover:text-red-500 transition-colors">🗑️</button>
            </div>
          </transition-group>

          <div v-if="!isLoading && ((activeTab === 'projects' && projects.length === 0) || (activeTab === 'certificates' && certificates.length === 0) || (activeTab === 'publications' && publications.length === 0))" class="py-20 text-center border-2 border-dashed border-zinc-800 rounded-3xl opacity-50">
            <p class="text-zinc-500">Data masih kosong.</p>
          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
/* Utility Classes for Glassmorphism */
.glass-input {
  @apply w-full bg-black/40 border border-zinc-700 rounded-lg p-3 text-sm text-white focus:border-brand-primary focus:bg-black/60 outline-none transition-all placeholder:text-zinc-600;
}
.glass-file {
  @apply w-full text-xs text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-zinc-800 file:text-brand-primary hover:file:bg-brand-primary hover:file:text-white cursor-pointer;
}
.glass-btn {
  /* Ganti 'hover:bg-brand-primary-light' jadi 'hover:brightness-110' */
  @apply w-full bg-brand-primary hover:brightness-110 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 shadow-lg shadow-brand-primary/20 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95;
}
.glass-card {
  @apply bg-zinc-900/40 border border-zinc-800/50 rounded-2xl overflow-hidden hover:border-brand-primary/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1;
}

/* Animations */
.fade-enter-active, .fade-leave-active { transition: opacity 0.5s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.list-enter-active, .list-leave-active { transition: all 0.4s ease; }
.list-enter-from, .list-leave-to { opacity: 0; transform: translateY(20px); }
.list-move { transition: transform 0.4s ease; }
</style>
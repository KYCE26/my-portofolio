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
  <div class="min-h-screen bg-brand-bg font-sans selection:bg-brand-primary selection:text-white">
    
    <!-- Login Screen -->
    <div v-if="!isAuthenticated" class="min-h-screen flex items-center justify-center p-6 bg-brand-surface">
      <div class="w-full max-w-sm bg-white border border-brand-border p-8 md:p-12 shadow-sm">
        <h1 class="font-serif text-3xl font-bold text-brand-text mb-2 tracking-tight">Rifky.Admin</h1>
        <p class="font-mono text-xs text-brand-subtext uppercase tracking-widest mb-8">Access Required</p>
        
        <form @submit.prevent="checkAuth" class="space-y-6">
          <div>
            <label class="block font-mono text-xs font-bold text-brand-text uppercase mb-2">Secret Code</label>
            <input 
              v-model="inputCode" 
              type="password" 
              class="w-full bg-brand-bg border border-brand-border p-3 text-sm text-brand-text focus:border-brand-primary outline-none transition-colors"
              placeholder="•••••"
              autofocus
            >
          </div>
          <button type="submit" class="w-full bg-brand-text hover:bg-brand-primary text-brand-bg font-bold py-3 px-4 uppercase text-xs tracking-widest transition-colors duration-200">
            Authenticate
          </button>
          <p v-if="authError" class="text-brand-primary text-xs font-mono font-bold">Error: Invalid Code</p>
        </form>
      </div>
    </div>

    <!-- Dashboard -->
    <div v-else class="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20">
      
      <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
        <div>
          <h1 class="font-serif text-4xl md:text-5xl font-bold text-brand-text tracking-tight mb-2">Command Center</h1>
          <p class="font-mono text-xs text-brand-subtext uppercase tracking-widest">Manage Portfolio Content</p>
        </div>
        <button @click="logout" class="border border-brand-border hover:border-brand-text text-brand-text font-bold py-2 px-6 text-xs uppercase tracking-widest transition-colors">
          Logout
        </button>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        <!-- Sidebar / Forms -->
        <div class="lg:col-span-4 space-y-12">
          
          <div class="flex flex-wrap gap-2">
            <button 
              @click="activeTab = 'projects'" 
              :class="activeTab === 'projects' ? 'bg-brand-text text-white' : 'border border-brand-border bg-white text-brand-subtext hover:border-brand-text hover:text-brand-text'"
              class="px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors"
            >Projects</button>
            <button 
              @click="activeTab = 'certificates'"
              :class="activeTab === 'certificates' ? 'bg-brand-text text-white' : 'border border-brand-border bg-white text-brand-subtext hover:border-brand-text hover:text-brand-text'"
              class="px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors"
            >Certs</button>
            <button 
              @click="activeTab = 'publications'"
              :class="activeTab === 'publications' ? 'bg-brand-text text-white' : 'border border-brand-border bg-white text-brand-subtext hover:border-brand-text hover:text-brand-text'"
              class="px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors"
            >Pubs</button>
          </div>

          <div class="bg-white border border-brand-border p-6 md:p-8">
            <h2 class="font-serif text-xl font-bold text-brand-text mb-6">New Entry</h2>

            <form v-if="activeTab === 'projects'" @submit.prevent="submitProject" class="space-y-5">
              <input v-model="projectForm.title" placeholder="Project Title" class="editorial-input" required>
              <textarea v-model="projectForm.description" placeholder="Description" rows="3" class="editorial-input"></textarea>
              <input v-model="projectForm.tags" placeholder="Tags (comma separated)" class="editorial-input">
              <div class="grid grid-cols-2 gap-4">
                <input v-model="projectForm.repo_url" placeholder="Repo URL" class="editorial-input">
                <input v-model="projectForm.demo_url" placeholder="Demo URL" class="editorial-input">
              </div>
              <div class="space-y-2">
                <label class="block font-mono text-[10px] font-bold text-brand-subtext uppercase tracking-widest">Cover Image</label>
                <input @change="handleProjectFile" type="file" accept="image/*" class="w-full text-xs text-brand-subtext cursor-pointer file:cursor-pointer file:border-0 file:bg-brand-surface file:text-brand-text file:px-4 file:py-2 file:font-mono file:uppercase file:text-[10px] file:tracking-widest file:font-bold hover:file:bg-brand-text hover:file:text-white file:transition-colors">
              </div>
              <button type="submit" :disabled="isSubmitting" class="w-full bg-brand-primary hover:bg-brand-primary-dark text-white font-bold py-3 px-4 uppercase text-xs tracking-widest transition-colors disabled:opacity-50">
                {{ isSubmitting ? 'Uploading...' : 'Publish Project' }}
              </button>
            </form>

            <form v-if="activeTab === 'certificates'" @submit.prevent="submitCertificate" class="space-y-5">
              <input v-model="certForm.title" placeholder="Certificate Title" class="editorial-input" required>
              <input v-model="certForm.issuer" placeholder="Issuer (e.g., Oracle)" class="editorial-input" required>
              <div class="space-y-2">
                <label class="block font-mono text-[10px] font-bold text-brand-subtext uppercase tracking-widest">Preview Image</label>
                <input @change="handleCertImage" type="file" accept="image/*" class="w-full text-xs text-brand-subtext cursor-pointer file:cursor-pointer file:border-0 file:bg-brand-surface file:text-brand-text file:px-4 file:py-2 file:font-mono file:uppercase file:text-[10px] file:tracking-widest file:font-bold hover:file:bg-brand-text hover:file:text-white file:transition-colors">
              </div>
              <div class="space-y-2">
                <label class="block font-mono text-[10px] font-bold text-brand-subtext uppercase tracking-widest">PDF Document</label>
                <input @change="handleCertPdf" type="file" accept="application/pdf" class="w-full text-xs text-brand-subtext cursor-pointer file:cursor-pointer file:border-0 file:bg-brand-surface file:text-brand-text file:px-4 file:py-2 file:font-mono file:uppercase file:text-[10px] file:tracking-widest file:font-bold hover:file:bg-brand-text hover:file:text-white file:transition-colors">
              </div>
              <button type="submit" :disabled="isSubmitting" class="w-full bg-brand-primary hover:bg-brand-primary-dark text-white font-bold py-3 px-4 uppercase text-xs tracking-widest transition-colors disabled:opacity-50">
                {{ isSubmitting ? 'Uploading...' : 'Save Certificate' }}
              </button>
            </form>

            <form v-if="activeTab === 'publications'" @submit.prevent="submitPublication" class="space-y-5">
              <input v-model="pubForm.title" placeholder="Publication Title" class="editorial-input" required>
              <div class="relative">
                <select v-model="pubForm.type" class="editorial-input appearance-none cursor-pointer">
                  <option value="Artikel">Artikel</option>
                  <option value="Buku">Buku</option>
                  <option value="Jurnal">Jurnal</option>
                  <option value="Video">Video</option>
                </select>
                <div class="absolute right-4 top-3 pointer-events-none text-brand-subtext font-mono text-xs">▼</div>
              </div>
              <textarea v-model="pubForm.description" placeholder="Short Description" rows="3" class="editorial-input"></textarea>
              <input v-model="pubForm.link" placeholder="External URL" class="editorial-input">
              <button type="submit" :disabled="isSubmitting" class="w-full bg-brand-primary hover:bg-brand-primary-dark text-white font-bold py-3 px-4 uppercase text-xs tracking-widest transition-colors disabled:opacity-50">
                {{ isSubmitting ? 'Saving...' : 'Publish Record' }}
              </button>
            </form>

          </div>
        </div>

        <!-- Data Display -->
        <div class="lg:col-span-8">
          
          <div class="flex items-center justify-between mb-8 pb-4 border-b border-brand-border">
            <h2 class="font-serif text-2xl font-bold text-brand-text">Active Records</h2>
            <div v-if="isLoading" class="font-mono text-xs uppercase tracking-widest text-brand-primary animate-pulse">
              Syncing...
            </div>
          </div>

          <transition-group name="list" tag="div" class="space-y-4" v-if="activeTab === 'projects'">
            <div v-for="item in projects" :key="item.id" class="flex flex-col sm:flex-row gap-6 p-6 border border-brand-border bg-white group hover:border-brand-text transition-colors">
              <div class="w-full sm:w-48 aspect-video bg-brand-surface shrink-0 relative border border-brand-border">
                <img v-if="item.image_url" :src="item.image_url" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500">
                <div v-else class="w-full h-full flex items-center justify-center text-brand-subtext font-mono text-[10px] uppercase">No Image</div>
              </div>
              <div class="flex-grow flex flex-col">
                <h3 class="font-serif text-xl font-bold text-brand-text mb-2">{{ item.title }}</h3>
                <p class="text-sm text-brand-subtext line-clamp-2 mb-4">{{ item.description }}</p>
                <div class="mt-auto flex justify-between items-center pt-4 border-t border-brand-surface">
                   <div class="flex flex-wrap gap-2">
                     <span v-for="tag in item.tags" :key="tag" class="font-mono text-[10px] bg-brand-surface border border-brand-border px-2 py-1 uppercase">{{ tag }}</span>
                   </div>
                   <button @click="deleteItem('projects', item.id)" class="text-xs font-bold uppercase tracking-widest text-brand-text hover:text-red-600 transition-colors">Delete</button>
                </div>
              </div>
            </div>
          </transition-group>

          <transition-group name="list" tag="div" class="grid grid-cols-1 md:grid-cols-2 gap-4" v-if="activeTab === 'certificates'">
            <div v-for="item in certificates" :key="item.id" class="p-6 border border-brand-border bg-white flex flex-col group hover:border-brand-text transition-colors">
              <div class="aspect-video w-full bg-brand-surface border border-brand-border mb-4">
                <img v-if="item.image_url" :src="item.image_url" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500">
              </div>
              <div class="font-mono text-[10px] text-brand-subtext uppercase tracking-widest mb-1">{{ item.issuer }}</div>
              <h3 class="font-serif text-lg font-bold text-brand-text mb-4">{{ item.title }}</h3>
              <div class="mt-auto flex justify-between items-center pt-4 border-t border-brand-surface">
                <a v-if="item.pdf_url" :href="item.pdf_url" target="_blank" class="text-xs font-bold uppercase tracking-widest hover:text-brand-primary">View PDF</a>
                <span v-else class="text-xs font-bold uppercase tracking-widest text-brand-subtext">No PDF</span>
                <button @click="deleteItem('certificates', item.id)" class="text-xs font-bold uppercase tracking-widest text-brand-text hover:text-red-600 transition-colors">Delete</button>
              </div>
            </div>
          </transition-group>

          <transition-group name="list" tag="div" class="space-y-2" v-if="activeTab === 'publications'">
            <div v-for="item in publications" :key="item.id" class="p-4 border border-brand-border bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group hover:border-brand-text transition-colors">
              <div class="flex-grow">
                <div class="font-mono text-[10px] text-brand-primary font-bold uppercase tracking-widest mb-1">{{ item.type }}</div>
                <h3 class="font-serif text-base font-bold text-brand-text">{{ item.title }}</h3>
                <p class="text-sm text-brand-subtext line-clamp-1 mt-1">{{ item.description }}</p>
              </div>
              <div class="flex items-center gap-6 shrink-0">
                <a v-if="item.link" :href="item.link" target="_blank" class="text-xs font-bold uppercase tracking-widest hover:text-brand-primary">Link</a>
                <button @click="deleteItem('publications', item.id)" class="text-xs font-bold uppercase tracking-widest text-brand-text hover:text-red-600 transition-colors">Delete</button>
              </div>
            </div>
          </transition-group>

          <div v-if="!isLoading && ((activeTab === 'projects' && projects.length === 0) || (activeTab === 'certificates' && certificates.length === 0) || (activeTab === 'publications' && publications.length === 0))" class="py-16 text-center border border-brand-border bg-brand-surface">
            <p class="font-mono text-sm tracking-widest text-brand-subtext uppercase">No Records Found.</p>
          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.editorial-input {
  @apply w-full bg-brand-bg border border-brand-border p-3 text-sm text-brand-text focus:border-brand-primary outline-none transition-colors placeholder:text-brand-subtext;
}

.list-enter-active, .list-leave-active { transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
.list-enter-from, .list-leave-to { opacity: 0; transform: translateY(10px); }
.list-move { transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
</style>

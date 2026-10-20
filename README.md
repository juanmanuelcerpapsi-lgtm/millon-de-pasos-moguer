<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Un Millón de Pasos - PMD Moguer</title>
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Vue.js 3 -->
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <!-- FontAwesome icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">

    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        brand: {
                            50: '#fff1f2',
                            100: '#ffe4e6',
                            200: '#fecdd3',
                            500: '#e11d48',
                            600: '#be123c',
                            700: '#9f1239',
                            800: '#881337',
                            900: '#4c0519',
                        }
                    },
                    fontFamily: {
                        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
                    }
                }
            }
        }
    </script>
    <style>
        [v-cloak] { display: none; }
        .bg-pattern {
            background-color: #be123c;
            background-image: radial-gradient(#e11d48 1px, transparent 1px);
            background-size: 16px 16px;
        }
        @media print {
            body * { visibility: hidden; }
            #printable-diploma, #printable-diploma * { visibility: visible; }
            #printable-diploma {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                margin: 0;
                padding: 0;
            }
            .no-print { display: none !important; }
        }
    </style>
</head>
<body class="bg-stone-50 text-stone-800 font-sans min-h-screen flex flex-col antialiased selection:bg-brand-500 selection:text-white">

    <div id="app" v-cloak class="flex-1 flex flex-col min-h-screen">
        
        <!-- HEADER -->
        <header class="bg-gradient-to-r from-brand-900 via-brand-800 to-brand-900 text-white shadow-xl sticky top-0 z-40 border-b border-brand-700">
            <div class="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
                <div class="flex items-center space-x-3 cursor-pointer" @click="currentTab = 'routes'">
                    <div class="bg-white p-1 rounded-xl shadow-md flex items-center justify-center">
                        <img src="pmd.jpg" alt="PMD Moguer" class="h-10 w-auto object-contain" onerror="this.src='pmd_2.jpg'">
                    </div>
                    <div>
                        <h1 class="text-xl md:text-2xl font-extrabold tracking-tight leading-tight flex items-center gap-2">
                            <span>Un Millón de Pasos</span>
                        </h1>
                        <p class="text-xs text-brand-200 font-medium">Patronato Municipal de Deportes - Moguer</p>
                    </div>
                </div>

                <!-- Admin Toggle -->
                <div class="flex items-center space-x-3">
                    <button @click="isAdmin = !isAdmin" 
                            :class="isAdmin ? 'bg-amber-500 text-stone-900 font-bold' : 'bg-brand-800 text-brand-200 hover:text-white'"
                            class="px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition-all shadow-inner border border-brand-700">
                        <i class="fa-solid" :class="isAdmin ? 'fa-user-shield' : 'fa-lock'"></i>
                        <span class="hidden sm:inline">{{ isAdmin ? 'Modo Organizador' : 'Acceso Admin' }}</span>
                    </button>
                </div>
            </div>

            <!-- Navegación de pestañas -->
            <div class="bg-brand-950/60 backdrop-blur-md px-4 border-t border-brand-800/50">
                <div class="max-w-6xl mx-auto flex space-x-2 sm:space-x-4">
                    <button @click="currentTab = 'routes'" 
                            :class="currentTab === 'routes' ? 'border-brand-500 text-white font-bold bg-brand-800/40' : 'border-transparent text-brand-200 hover:text-white'"
                            class="py-2.5 px-4 text-sm font-medium border-b-2 transition-all flex items-center gap-2">
                        <i class="fa-solid fa-person-walking-with-cane"></i>
                        <span>Próximas Salidas</span>
                    </button>
                    <button @click="currentTab = 'participants'" 
                            :class="currentTab === 'participants' ? 'border-brand-500 text-white font-bold bg-brand-800/40' : 'border-transparent text-brand-200 hover:text-white'"
                            class="py-2.5 px-4 text-sm font-medium border-b-2 transition-all flex items-center gap-2">
                        <i class="fa-solid fa-users"></i>
                        <span>Lista General ({{ allParticipants.length }})</span>
                    </button>
                </div>
            </div>
        </header>

        <!-- BANNER PRINCIPAL -->
        <div class="bg-pattern text-white py-8 px-4 shadow-inner relative overflow-hidden">
            <div class="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div class="max-w-2xl text-center md:text-left">
                    <span class="bg-brand-900/80 text-brand-200 text-xs font-semibold px-3 py-1 rounded-full border border-brand-700 inline-block mb-3">
                        Programa de Salud y Deporte Comunitario
                    </span>
                    <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight mb-2">
                        ¡Suma tus pasos por la salud en Moguer!
                    </h2>
                    <p class="text-brand-100 text-sm sm:text-base leading-relaxed">
                        Inscríbete en las salidas programadas por el PMD. Selecciona la ruta que prefieras, completa tus datos y obtén tu diploma acreditativo al finalizar.
                    </p>
                </div>
                <div v-if="isAdmin" class="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl text-center flex-shrink-0">
                    <button @click="openCreateRouteModal" class="bg-white text-brand-700 hover:bg-brand-50 font-bold px-5 py-2.5 rounded-xl text-sm shadow-lg transition-all flex items-center gap-2 mx-auto">
                        <i class="fa-solid fa-plus-circle"></i>
                        <span>Nueva Salida</span>
                    </button>
                    <p class="text-xs text-brand-100 mt-2">Panel de administración activo</p>
                </div>
            </div>
        </div>

        <!-- CONTENIDO PRINCIPAL -->
        <main class="max-w-6xl mx-auto px-4 py-8 flex-1 w-full">

            <!-- VISTA: PRÓXIMAS SALIDAS -->
            <section v-if="currentTab === 'routes'">
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                        <h3 class="text-xl font-bold text-stone-900 flex items-center gap-2">
                            <i class="fa-solid fa-calendar-day text-brand-600"></i>
                            Rutas Programadas
                        </h3>
                        <p class="text-stone-500 text-sm">Inscríbete gratis en cualquiera de las próximas salidas</p>
                    </div>

                    <!-- Buscador -->
                    <div class="relative min-w-[240px]">
                        <i class="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-sm"></i>
                        <input v-model="searchQuery" type="text" placeholder="Buscar por nombre o lugar..." 
                               class="w-full pl-9 pr-4 py-2 bg-white border border-stone-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all shadow-sm">
                    </div>
                </div>

                <!-- Lista de Rutas -->
                <div v-if="filteredRoutes.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div v-for="route in filteredRoutes" :key="route.id" 
                         class="bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between">
                        
                        <div>
                            <!-- Header de la tarjeta -->
                            <div class="bg-stone-100/70 p-5 border-b border-stone-100 flex justify-between items-start">
                                <div>
                                    <span class="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-2.5 py-1 rounded-md border border-brand-100 inline-block mb-2">
                                        {{ route.location }}
                                    </span>
                                    <h4 class="text-lg font-bold text-stone-900 leading-snug">{{ route.title }}</h4>
                                </div>
                                <span class="text-xs font-semibold px-2.5 py-1 rounded-full"
                                      :class="{
                                          'bg-emerald-100 text-emerald-800': route.difficulty === 'Fácil',
                                          'bg-amber-100 text-amber-800': route.difficulty === 'Media',
                                          'bg-red-100 text-red-800': route.difficulty === 'Alta'
                                      }">
                                    {{ route.difficulty }}
                                </span>
                            </div>

                            <!-- Detalle de la ruta -->
                            <div class="p-5 space-y-3 text-sm text-stone-600">
                                <p class="text-xs text-stone-500 line-clamp-2">{{ route.description }}</p>

                                <div class="grid grid-cols-2 gap-3 pt-2 text-xs">
                                    <div class="flex items-center gap-2 bg-stone-50 p-2 rounded-lg border border-stone-100">
                                        <i class="fa-regular fa-calendar text-brand-600"></i>
                                        <div>
                                            <p class="text-stone-400 font-medium">Fecha</p>
                                            <p class="font-bold text-stone-800">{{ formatDate(route.date) }}</p>
                                        </div>
                                    </div>
                                    <div class="flex items-center gap-2 bg-stone-50 p-2 rounded-lg border border-stone-100">
                                        <i class="fa-regular fa-clock text-brand-600"></i>
                                        <div>
                                            <p class="text-stone-400 font-medium">Hora</p>
                                            <p class="font-bold text-stone-800">{{ route.time }} h</p>
                                        </div>
                                    </div>
                                    <div class="flex items-center gap-2 bg-stone-50 p-2 rounded-lg border border-stone-100">
                                        <i class="fa-solid fa-route text-brand-600"></i>
                                        <div>
                                            <p class="text-stone-400 font-medium">Distancia</p>
                                            <p class="font-bold text-stone-800">{{ route.distance }} km</p>
                                        </div>
                                    </div>
                                    <div class="flex items-center gap-2 bg-stone-50 p-2 rounded-lg border border-stone-100">
                                        <i class="fa-solid fa-location-dot text-brand-600"></i>
                                        <div>
                                            <p class="text-stone-400 font-medium">Encuentro</p>
                                            <p class="font-bold text-stone-800 truncate">{{ route.meetingPoint }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Footer de la tarjeta con estado e inscripción -->
                        <div class="p-5 bg-stone-50/50 border-t border-stone-100 flex items-center justify-between">
                            <div>
                                <p class="text-xs text-stone-500">Inscritos</p>
                                <p class="text-sm font-bold text-stone-800">
                                    {{ getParticipantsCount(route.id) }} / {{ route.maxParticipants }} plazas
                                </p>
                            </div>

                            <button @click="openRegisterModal(route)" 
                                    :disabled="getParticipantsCount(route.id) >= route.maxParticipants"
                                    :class="getParticipantsCount(route.id) >= route.maxParticipants ? 'bg-stone-300 cursor-not-allowed text-stone-500' : 'bg-brand-600 hover:bg-brand-700 text-white shadow-md shadow-brand-600/20'"
                                    class="px-4 py-2 rounded-xl font-bold text-sm transition-all flex items-center gap-2">
                                <i class="fa-solid fa-pen-to-square"></i>
                                <span>{{ getParticipantsCount(route.id) >= route.maxParticipants ? 'Agotado' : 'Apuntarme' }}</span>
                            </button>
                        </div>

                    </div>
                </div>

                <!-- Empty state -->
                <div v-else class="text-center py-12 bg-white rounded-2xl border border-dashed border-stone-300">
                    <i class="fa-solid fa-route text-4xl text-stone-300 mb-3"></i>
                    <p class="text-stone-600 font-medium">No se han encontrado rutas de senderismo.</p>
                </div>
            </section>

            <!-- VISTA: LISTA GENERAL DE PARTICIPANTES -->
            <section v-if="currentTab === 'participants'" class="bg-white rounded-2xl border border-stone-200 shadow-sm p-6">
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                        <h3 class="text-xl font-bold text-stone-900 flex items-center gap-2">
                            <i class="fa-solid fa-users text-brand-600"></i>
                            Lista General de Participación
                        </h3>
                        <p class="text-stone-500 text-sm">Registro unificado de todos los inscritos en el programa</p>
                    </div>

                    <!-- Filtro -->
                    <div class="relative min-w-[260px]">
                        <i class="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-sm"></i>
                        <input v-model="participantSearch" type="text" placeholder="Buscar participante..." 
                               class="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 outline-none">
                    </div>
                </div>

                <!-- Tabla de participantes -->
                <div v-if="filteredParticipants.length > 0" class="overflow-x-auto">
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr class="border-b border-stone-200 bg-stone-50/80 text-xs font-bold text-stone-500 uppercase tracking-wider">
                                <th class="p-3">Participante</th>
                                <th class="p-3">Edad</th>
                                <th class="p-3">Correo Electrónico</th>
                                <th class="p-3">Condición Física</th>
                                <th class="p-3">Ruta Asignada</th>
                                <th v-if="isAdmin" class="p-3 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-stone-100 text-sm">
                            <tr v-for="p in filteredParticipants" :key="p.id" class="hover:bg-stone-50 transition-colors">
                                <td class="p-3 font-bold text-stone-800">{{ p.fullName }}</td>
                                <td class="p-3 text-stone-600">{{ p.age }} años</td>
                                <td class="p-3 text-stone-600 font-mono text-xs">{{ p.email }}</td>
                                <td class="p-3">
                                    <span class="text-xs px-2.5 py-1 rounded-full font-medium"
                                          :class="{
                                              'bg-stone-100 text-stone-700': p.fitnessLevel === 'Baja',
                                              'bg-blue-100 text-blue-800': p.fitnessLevel === 'Media',
                                              'bg-emerald-100 text-emerald-800': p.fitnessLevel === 'Alta'
                                          }">
                                        {{ p.fitnessLevel }}
                                    </span>
                                </td>
                                <td class="p-3 text-stone-600 font-medium">
                                    {{ getRouteTitle(p.routeId) }}
                                </td>
                                <td v-if="isAdmin" class="p-3 text-right space-x-2">
                                    <button @click="generateDiploma(p)" 
                                            class="bg-amber-500 hover:bg-amber-600 text-stone-900 px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm transition-all inline-flex items-center gap-1">
                                        <i class="fa-solid fa-certificate"></i>
                                        <span>Generar Diploma</span>
                                    </button>
                                    <button @click="removeParticipant(p.id)" 
                                            class="text-stone-400 hover:text-red-600 p-1.5 rounded-lg transition-colors" title="Eliminar registro">
                                        <i class="fa-solid fa-trash-can"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Estado vacío -->
                <div v-else class="text-center py-12 text-stone-400">
                    <i class="fa-solid fa-user-slash text-3xl mb-2"></i>
                    <p>No hay participantes registrados actualmente.</p>
                </div>
            </section>

        </main>

        <!-- FOOTER ORGANIZACIONAL -->
        <footer class="bg-stone-900 text-white mt-12 border-t-4 border-brand-600">
            <div class="max-w-6xl mx-auto px-4 py-8">
                <p class="text-center text-stone-400 text-xs uppercase font-bold tracking-widest mb-6">Organizan y Colaboran</p>
                
                <!-- Logos ordenados estrictamente -->
                <div class="flex flex-wrap items-center justify-center gap-8 md:gap-12">
                    
                    <!-- 1. Ayuntamiento de Moguer -->
                    <div class="bg-white p-3 rounded-2xl shadow-md flex items-center justify-center h-20 w-36 hover:scale-105 transition-transform">
                        <img src="ayto.jpg" alt="Ayuntamiento de Moguer" class="max-h-full max-w-full object-contain">
                    </div>

                    <!-- 2. Patronato Municipal de Deportes -->
                    <div class="bg-white p-3 rounded-2xl shadow-md flex items-center justify-center h-20 w-36 hover:scale-105 transition-transform">
                        <img src="pmd.jpg" alt="PMD Moguer" class="max-h-full max-w-full object-contain" onerror="this.src='pmd_2.jpg'">
                    </div>

                    <!-- 3. Moguer, y Yo -->
                    <div class="bg-white p-3 rounded-2xl shadow-md flex items-center justify-center h-20 w-36 hover:scale-105 transition-transform">
                        <img src="moguer y yo.png" alt="Moguer y Yo" class="max-h-full max-w-full object-contain">
                    </div>

                </div>

                <div class="mt-8 pt-6 border-t border-stone-800 text-center text-xs text-stone-500">
                    <p>© 2026 Patronato Municipal de Deportes de Moguer. Programa "Un Millón de Pasos".</p>
                </div>
            </div>
        </footer>

        <!-- MODAL 1: FORMULARIO DE INSCRIPCIÓN -->
        <div v-if="showRegisterModal" class="fixed inset-0 bg-stone-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative animate-in fade-in zoom-in duration-200">
                <button @click="showRegisterModal = false" class="absolute top-4 right-4 text-stone-400 hover:text-stone-600">
                    <i class="fa-solid fa-xmark text-xl"></i>
                </button>

                <div class="mb-5">
                    <span class="text-xs font-bold text-brand-600 uppercase tracking-wider">Inscripción</span>
                    <h3 class="text-xl font-bold text-stone-900">{{ selectedRoute?.title }}</h3>
                    <p class="text-xs text-stone-500 mt-0.5">{{ formatDate(selectedRoute?.date) }} - {{ selectedRoute?.location }}</p>
                </div>

                <form @submit.prevent="promptPrivacyConsent" class="space-y-4">
                    <div>
                        <label class="block text-xs font-bold text-stone-700 uppercase mb-1">Nombre y Apellidos *</label>
                        <input v-model="form.fullName" type="text" required placeholder="Ej. Juan Manuel Cerpa" 
                               class="w-full px-3.5 py-2 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 outline-none">
                    </div>

                    <div class="grid grid-cols-2 gap-3">
                        <div>
                            <label class="block text-xs font-bold text-stone-700 uppercase mb-1">Edad *</label>
                            <input v-model.number="form.age" type="number" min="5" max="100" required placeholder="Ej. 35" 
                                   class="w-full px-3.5 py-2 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 outline-none">
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-stone-700 uppercase mb-1">Condición Física *</label>
                            <select v-model="form.fitnessLevel" required class="w-full px-3.5 py-2 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 outline-none">
                                <option value="Baja">Baja</option>
                                <option value="Media">Media</option>
                                <option value="Alta">Alta</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label class="block text-xs font-bold text-stone-700 uppercase mb-1">Correo Electrónico *</label>
                        <input v-model="form.email" type="email" required placeholder="ejemplo@correo.com" 
                               class="w-full px-3.5 py-2 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 outline-none">
                    </div>

                    <div class="pt-2">
                        <button type="submit" class="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-xl text-sm shadow-lg shadow-brand-600/30 transition-all flex items-center justify-center gap-2">
                            <span>Continuar con la inscripción</span>
                            <i class="fa-solid fa-arrow-right"></i>
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <!-- MODAL 2: ACEPTACIÓN DE PROTECCIÓN DE DATOS (RGPD) -->
        <div v-if="showPrivacyModal" class="fixed inset-0 bg-stone-900/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div class="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative border-2 border-brand-500">
                <div class="text-center mb-4">
                    <div class="w-12 h-12 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center mx-auto mb-2 text-xl">
                        <i class="fa-solid fa-shield-halved"></i>
                    </div>
                    <h3 class="text-lg font-bold text-stone-900">Protección de Datos y Privacidad</h3>
                    <p class="text-xs text-stone-500">Patronato Municipal de Deportes de Moguer</p>
                </div>

                <div class="bg-stone-50 border border-stone-200 rounded-xl p-4 text-xs text-stone-600 leading-relaxed space-y-2 mb-6 max-h-48 overflow-y-auto">
                    <p class="font-semibold text-stone-800">Información básica sobre Protección de Datos:</p>
                    <p>En cumplimiento del Reglamento General de Protección de Datos (RGPD), le informamos que sus datos personales serán tratados por el Patronato Municipal de Deportes de Moguer.</p>
                    <p class="font-semibold text-brand-700">Finalidad Exclusiva:</p>
                    <p>Sus datos (*Nombre, Apellidos, Edad y Correo Electrónico*) se utilizarán **única y exclusivamente** para la elaboración de la lista de participación de la actividad "Un Millón de Pasos" y para la emisión del diploma oficial de participación.</p>
                    <p>No se cederán datos a terceros salvo obligación legal.</p>
                </div>

                <div class="flex flex-col sm:flex-row gap-3">
                    <button @click="declinePrivacy" class="w-full py-2.5 px-4 bg-stone-200 hover:bg-stone-300 text-stone-700 font-bold rounded-xl text-sm transition-all">
                        Rechazar (Cancelar)
                    </button>
                    <button @click="acceptPrivacyAndRegister" class="w-full py-2.5 px-4 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl text-sm shadow-md shadow-brand-600/30 transition-all flex items-center justify-center gap-2">
                        <i class="fa-solid fa-check"></i>
                        <span>Aceptar y Apuntarme</span>
                    </button>
                </div>
            </div>
        </div>

        <!-- MODAL 3: VISTA E IMPRESIÓN DE DIPLOMA (EXCLUSIVO ORGANIZADOR) -->
        <div v-if="showDiplomaModal" class="fixed inset-0 bg-stone-900/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div class="bg-white rounded-2xl max-w-3xl w-full p-6 shadow-2xl relative my-8">
                
                <!-- Acciones modal -->
                <div class="flex justify-between items-center mb-6 no-print border-b pb-4">
                    <h3 class="font-bold text-stone-800 flex items-center gap-2">
                        <i class="fa-solid fa-certificate text-amber-500"></i>
                        Diploma de Participación
                    </h3>
                    <div class="flex items-center space-x-2">
                        <button @click="printDiploma" class="bg-brand-600 hover:bg-brand-700 text-white font-bold px-4 py-2 rounded-xl text-xs shadow transition-all flex items-center gap-2">
                            <i class="fa-solid fa-print"></i>
                            <span>Imprimir / PDF</span>
                        </button>
                        <button @click="showDiplomaModal = false" class="text-stone-400 hover:text-stone-600 p-2">
                            <i class="fa-solid fa-xmark text-xl"></i>
                        </button>
                    </div>
                </div>

                <!-- PLANTILLA DIPLOMA IMPRIMIBLE -->
                <div id="printable-diploma" class="border-8 border-brand-800 p-8 rounded-xl bg-gradient-to-b from-stone-50 via-white to-stone-50 text-center relative overflow-hidden shadow-inner">
                    <!-- Marco decorativo -->
                    <div class="border-2 border-amber-500/40 p-6 rounded-lg">
                        
                        <!-- Logos de cabecera diploma -->
                        <div class="flex justify-between items-center mb-6 px-4">
                            <img src="ayto.jpg" alt="Ayto Moguer" class="h-12 w-auto object-contain">
                            <img src="pmd.jpg" alt="PMD Moguer" class="h-12 w-auto object-contain" onerror="this.src='pmd_2.jpg'">
                        </div>

                        <p class="text-xs font-bold tracking-widest text-brand-800 uppercase mb-1">Patronato Municipal de Deportes de Moguer</p>
                        <h2 class="text-3xl font-extrabold text-stone-900 tracking-tight mb-4">DIPLOMA DE PARTICIPACIÓN</h2>
                        
                        <p class="text-sm text-stone-600 italic mb-2">Otorgado con orgullo a:</p>
                        <h3 class="text-2xl font-black text-brand-700 border-b-2 border-amber-400 inline-block px-8 py-1 mb-4 uppercase tracking-wide">
                            {{ activeDiplomaParticipant?.fullName }}
                        </h3>

                        <p class="text-sm text-stone-700 leading-relaxed max-w-xl mx-auto mb-6">
                            Por su excelente participación en la actividad de senderismo de salud comunitaria <br>
                            <strong class="text-stone-900 font-bold">"{{ getRouteTitle(activeDiplomaParticipant?.routeId) }}"</strong><br>
                            dentro del programa municipal <strong class="text-brand-700">Un Millón de Pasos</strong>.
                        </p>

                        <div class="grid grid-cols-2 gap-4 text-xs text-stone-500 pt-6 border-t border-stone-200 max-w-md mx-auto">
                            <div>
                                <p class="font-bold text-stone-800">Moguer, Huelva</p>
                                <p>{{ currentDateFormatted }}</p>
                            </div>
                            <div>
                                <p class="font-bold text-stone-800">PMD Moguer</p>
                                <p class="italic text-stone-400">Firma Digital Oficial</p>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>

        <!-- MODAL 4: CREACIÓN DE RUTA (ORGANIZADOR) -->
        <div v-if="showCreateRouteModal" class="fixed inset-0 bg-stone-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
                <button @click="showCreateRouteModal = false" class="absolute top-4 right-4 text-stone-400 hover:text-stone-600">
                    <i class="fa-solid fa-xmark text-xl"></i>
                </button>

                <h3 class="text-xl font-bold text-stone-900 mb-4">Crear Nueva Salida</h3>

                <form @submit.prevent="saveNewRoute" class="space-y-3 text-xs">
                    <div>
                        <label class="block font-bold text-stone-700 uppercase mb-1">Título de la ruta</label>
                        <input v-model="newRoute.title" type="text" required class="w-full p-2 border rounded-lg">
                    </div>
                    <div class="grid grid-cols-2 gap-2">
                        <div>
                            <label class="block font-bold text-stone-700 uppercase mb-1">Lugar</label>
                            <input v-model="newRoute.location" type="text" required class="w-full p-2 border rounded-lg">
                        </div>
                        <div>
                            <label class="block font-bold text-stone-700 uppercase mb-1">Dificultad</label>
                            <select v-model="newRoute.difficulty" class="w-full p-2 border rounded-lg">
                                <option value="Fácil">Fácil</option>
                                <option value="Media">Media</option>
                                <option value="Alta">Alta</option>
                            </select>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-2">
                        <div>
                            <label class="block font-bold text-stone-700 uppercase mb-1">Fecha</label>
                            <input v-model="newRoute.date" type="date" required class="w-full p-2 border rounded-lg">
                        </div>
                        <div>
                            <label class="block font-bold text-stone-700 uppercase mb-1">Hora</label>
                            <input v-model="newRoute.time" type="time" required class="w-full p-2 border rounded-lg">
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-2">
                        <div>
                            <label class="block font-bold text-stone-700 uppercase mb-1">Distancia (km)</label>
                            <input v-model.number="newRoute.distance" type="number" step="0.1" required class="w-full p-2 border rounded-lg">
                        </div>
                        <div>
                            <label class="block font-bold text-stone-700 uppercase mb-1">Plazas Máx.</label>
                            <input v-model.number="newRoute.maxParticipants" type="number" required class="w-full p-2 border rounded-lg">
                        </div>
                    </div>
                    <div>
                        <label class="block font-bold text-stone-700 uppercase mb-1">Punto de encuentro</label>
                        <input v-model="newRoute.meetingPoint" type="text" required class="w-full p-2 border rounded-lg">
                    </div>
                    <div>
                        <label class="block font-bold text-stone-700 uppercase mb-1">Descripción</label>
                        <textarea v-model="newRoute.description" rows="2" class="w-full p-2 border rounded-lg"></textarea>
                    </div>

                    <button type="submit" class="w-full bg-brand-600 text-white font-bold py-2.5 rounded-xl text-sm mt-2">
                        Publicar Salida
                    </button>
                </form>
            </div>
        </div>

    </div>

    <!-- LÓGICA VUE 3 -->
    <script>
        const { createApp } = Vue;

        createApp({
            data() {
                return {
                    currentTab: 'routes',
                    isAdmin: false,
                    searchQuery: '',
                    participantSearch: '',
                    showRegisterModal: false,
                    showPrivacyModal: false,
                    showDiplomaModal: false,
                    showCreateRouteModal: false,
                    selectedRoute: null,
                    activeDiplomaParticipant: null,

                    // Formulario de inscripción simplificado
                    form: {
                        fullName: '',
                        age: null,
                        email: '',
                        fitnessLevel: 'Media'
                    },

                    // Nueva Ruta
                    newRoute: {
                        title: '',
                        location: 'Moguer',
                        difficulty: 'Fácil',
                        date: '',
                        time: '09:00',
                        distance: 8,
                        meetingPoint: 'Centro de Deportes PMD Moguer',
                        maxParticipants: 50,
                        description: ''
                    },

                    // Rutas iniciales de demostración
                    routes: JSON.parse(localStorage.getItem('pmd_routes')) || [
                        {
                            id: 1,
                            title: "Ruta del Coto de Montemayor",
                            location: "Moguer",
                            difficulty: "Fácil",
                            date: "2026-11-08",
                            time: "09:30",
                            distance: 7.5,
                            meetingPoint: "Ermita de Montemayor",
                            maxParticipants: 60,
                            description: "Salida suave rodeada de pinar autóctono ideal para iniciar el cómputo de pasos en grupo."
                        },
                        {
                            id: 2,
                            title: "Sendero Dunas y Pinos de Mazagón",
                            location: "Mazagón / Moguer",
                            difficulty: "Media",
                            date: "2026-11-22",
                            time: "09:00",
                            distance: 10.2,
                            meetingPoint: "Parador de Mazagón",
                            maxParticipants: 45,
                            description: "Ruta costera atravesando parajes naturales protegidos con impresionantes vistas al mar."
                        }
                    ],

                    // Participantes guardados
                    allParticipants: JSON.parse(localStorage.getItem('pmd_participants')) || []
                }
            },
            computed: {
                filteredRoutes() {
                    if (!this.searchQuery) return this.routes;
                    const q = this.searchQuery.toLowerCase();
                    return this.routes.filter(r => 
                        r.title.toLowerCase().includes(q) || 
                        r.location.toLowerCase().includes(q)
                    );
                },
                filteredParticipants() {
                    if (!this.participantSearch) return this.allParticipants;
                    const q = this.participantSearch.toLowerCase();
                    return this.allParticipants.filter(p => 
                        p.fullName.toLowerCase().includes(q) || 
                        p.email.toLowerCase().includes(q)
                    );
                },
                currentDateFormatted() {
                    return new Date().toLocaleDateString('es-ES', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                    });
                }
            },
            methods: {
                formatDate(dateStr) {
                    if (!dateStr) return '';
                    const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
                    return new Date(dateStr).toLocaleDateString('es-ES', options);
                },
                getParticipantsCount(routeId) {
                    return this.allParticipants.filter(p => p.routeId === routeId).length;
                },
                getRouteTitle(routeId) {
                    const route = this.routes.find(r => r.id === routeId);
                    return route ? route.title : 'Ruta Un Millón de Pasos';
                },
                openRegisterModal(route) {
                    this.selectedRoute = route;
                    this.form = { fullName: '', age: null, email: '', fitnessLevel: 'Media' };
                    this.showRegisterModal = true;
                },
                promptPrivacyConsent() {
                    this.showRegisterModal = false;
                    this.showPrivacyModal = true;
                },
                declinePrivacy() {
                    this.showPrivacyModal = false;
                },
                acceptPrivacyAndRegister() {
                    const newParticipant = {
                        id: Date.now(),
                        routeId: this.selectedRoute.id,
                        fullName: this.form.fullName,
                        age: this.form.age,
                        email: this.form.email,
                        fitnessLevel: this.form.fitnessLevel,
                        registeredAt: new Date().toISOString()
                    };

                    this.allParticipants.push(newParticipant);
                    this.saveData();

                    this.showPrivacyModal = false;
                    alert('¡Inscripción realizada con éxito! Nos vemos en la salida.');
                },
                removeParticipant(id) {
                    if (confirm('¿Seguro que deseas eliminar este registro?')) {
                        this.allParticipants = this.allParticipants.filter(p => p.id !== id);
                        this.saveData();
                    }
                },
                generateDiploma(participant) {
                    this.activeDiplomaParticipant = participant;
                    this.showDiplomaModal = true;
                },
                printDiploma() {
                    window.print();
                },
                openCreateRouteModal() {
                    this.showCreateRouteModal = true;
                },
                saveNewRoute() {
                    const route = {
                        ...this.newRoute,
                        id: Date.now()
                    };
                    this.routes.push(route);
                    this.saveData();
                    this.showCreateRouteModal = false;
                },
                saveData() {
                    localStorage.setItem('pmd_routes', JSON.stringify(this.routes));
                    localStorage.setItem('pmd_participants', JSON.stringify(this.allParticipants));
                }
            }
        }).mount('#app');
    </script>
</body>
</html>

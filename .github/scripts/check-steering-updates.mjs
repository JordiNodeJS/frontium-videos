#!/usr/bin/env node

/**
 * Script para verificar si los archivos de steering necesitan actualización
 * Uso: node .github/scripts/check-steering-updates.js
 */

import fs from 'fs';
import path from 'path';

const CONFIG_FILES = [
    'package.json',
    'README.md',
    'tsconfig.json',
    'next.config.ts',
    'next.config.js',
    'tailwind.config.js',
    'eslint.config.mjs',
    'components.json'
];

const STEERING_FILES = [
    '.kiro/steering/product.md',
    '.kiro/steering/tech.md',
    '.kiro/steering/structure.md'
];

function getFileModTime(filePath) {
    try {
        return fs.statSync(filePath).mtime;
    } catch (error) {
        return null;
    }
}

function checkSteeringUpdatesNeeded() {
    console.log('🔍 Verificando si los steering files necesitan actualización...\n');

    // Verificar si existen los archivos de steering
    const missingSteeringFiles = STEERING_FILES.filter(file => !fs.existsSync(file));

    if (missingSteeringFiles.length > 0) {
        console.log('❌ Archivos de steering faltantes:');
        missingSteeringFiles.forEach(file => console.log(`   - ${file}`));
        console.log('\n💡 Ejecuta: /kiro-agent-steering para crearlos\n');
        return true;
    }

    // Obtener fecha más reciente de archivos de configuración
    let latestConfigTime = new Date(0);
    let latestConfigFile = '';

    CONFIG_FILES.forEach(file => {
        const modTime = getFileModTime(file);
        if (modTime && modTime > latestConfigTime) {
            latestConfigTime = modTime;
            latestConfigFile = file;
        }
    });

    // Obtener fecha más antigua de archivos de steering
    let oldestSteeringTime = new Date();
    let oldestSteeringFile = '';

    STEERING_FILES.forEach(file => {
        const modTime = getFileModTime(file);
        if (modTime && modTime < oldestSteeringTime) {
            oldestSteeringTime = modTime;
            oldestSteeringFile = file;
        }
    });

    console.log(`📅 Último cambio en configuración: ${latestConfigTime.toLocaleString()} (${latestConfigFile})`);
    console.log(`📅 Steering más antiguo: ${oldestSteeringTime.toLocaleString()} (${oldestSteeringFile})`);

    if (latestConfigTime > oldestSteeringTime) {
        console.log('\n⚠️  Los archivos de steering están desactualizados');
        console.log('💡 Ejecuta: /kiro-agent-steering para actualizarlos\n');
        return true;
    } else {
        console.log('\n✅ Los archivos de steering están actualizados\n');
        return false;
    }
}

// Ejecutar verificación
const needsUpdate = checkSteeringUpdatesNeeded();
process.exit(needsUpdate ? 1 : 0);
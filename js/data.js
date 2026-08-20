// CalisBros - Calisthenics technical catalog (v5.3)
// Sources: FitDevotion, White Coat Trainer, Gymnase Tips, Wikipedia, Calisthenics Hub
// Developed by Oscar Antonio Alvarez Collado
// Exercise names: English technical names

const DIFFICULTY_LABELS = [
  {
    "min": 0,
    "max": 1.5,
    "label": "Básico"
  },
  {
    "min": 1.5,
    "max": 3,
    "label": "Básico-Intermedio"
  },
  {
    "min": 3,
    "max": 4.5,
    "label": "Intermedio"
  },
  {
    "min": 4.5,
    "max": 6,
    "label": "Intermedio-Avanzado"
  },
  {
    "min": 6,
    "max": 7.5,
    "label": "Avanzado"
  },
  {
    "min": 7.5,
    "max": 9,
    "label": "Avanzado-Élite"
  },
  {
    "min": 9,
    "max": 10,
    "label": "Élite"
  }
];

function getDifficultyLabel(score) {
  for (const d of DIFFICULTY_LABELS) {
    if (score >= d.min && score <= d.max) return d.label;
  }
  return 'Élite';
}

const CATEGORIES = {
  "empuje": {
    "name": "Empuje superior",
    "color": "#f97316"
  },
  "tiron": {
    "name": "Tirón superior",
    "color": "#3b82f6"
  },
  "piernas": {
    "name": "Piernas",
    "color": "#22c55e"
  },
  "core": {
    "name": "Core",
    "color": "#ef4444"
  },
  "skills": {
    "name": "Equilibrio y skills",
    "color": "#a855f7"
  },
  "conditioning": {
    "name": "Condicionamiento",
    "color": "#eab308"
  }
};

const EXERCISES = [
  {
    "id": "wall-push-up",
    "name": "Wall Push-up",
    "technicalName": "Wall Push-up",
    "category": "empuje",
    "difficulty": 0.8,
    "type": "reps",
    "muscles": [
      "Pectoral",
      "Tríceps",
      "Deltoides anterior"
    ],
    "description": "Empuje muy accesible para principiantes absolutos.",
    "progressions": [
      {
        "name": "Wall Push-up",
        "req": "15-25 reps",
        "current": true
      },
      {
        "name": "Incline Push-up",
        "req": "10-20 reps"
      },
      {
        "name": "Push-up",
        "req": "10-15 reps"
      }
    ],
    "equipment": [
      "suelo",
      "pared"
    ],
    "formTips": "Pies alejados de la pared aumentan la dificultad. Codos cerca del cuerpo.",
    "recommendedLevel": "principiante",
    "grips": null,
    "variations": null,
    "rangeCriteria": null
  },
  {
    "id": "incline-push-up",
    "name": "Incline Push-up",
    "technicalName": "Incline Push-up",
    "category": "empuje",
    "difficulty": 1.5,
    "type": "reps",
    "muscles": [
      "Pectoral",
      "Tríceps",
      "Deltoides anterior"
    ],
    "description": "Manos elevadas sobre banco o superficie. Reduce la carga respecto al push-up estándar.",
    "progressions": [
      {
        "name": "Wall Push-up",
        "req": "15+ reps"
      },
      {
        "name": "Incline Push-up",
        "req": "12-20 reps",
        "current": true
      },
      {
        "name": "Knee Push-up",
        "req": "12-20 reps"
      },
      {
        "name": "Push-up",
        "req": "10-15 reps"
      }
    ],
    "equipment": [
      "suelo",
      "banco"
    ],
    "formTips": "Manos elevadas. Mantén el tronco rígido igual que en el push-up estándar.",
    "recommendedLevel": "principiante",
    "grips": null,
    "variations": null,
    "rangeCriteria": null
  },
  {
    "id": "knee-push-up",
    "name": "Knee Push-up",
    "technicalName": "Knee Push-up",
    "category": "empuje",
    "difficulty": 1.8,
    "type": "reps",
    "muscles": [
      "Pectoral",
      "Tríceps"
    ],
    "description": "Variante con apoyo de rodillas. Mantiene el patrón de empuje horizontal.",
    "progressions": [
      {
        "name": "Incline Push-up",
        "req": "12+ reps"
      },
      {
        "name": "Knee Push-up",
        "req": "12-20 reps",
        "current": true
      },
      {
        "name": "Push-up",
        "req": "8-15 reps"
      }
    ],
    "equipment": [
      "suelo"
    ],
    "formTips": "Rodillas apoyadas, cadera alineada. No dejes que el trasero se levante.",
    "recommendedLevel": "principiante",
    "grips": null,
    "variations": null,
    "rangeCriteria": null
  },
  {
    "id": "wrist-push-up",
    "name": "Wrist Push-up",
    "technicalName": "Wrist Push-up",
    "category": "empuje",
    "difficulty": 2,
    "type": "reps",
    "muscles": [
      "Muñecas",
      "Antebrazos"
    ],
    "description": "Trabajo de movilidad y fuerza de muñeca, clave en calistenia.",
    "progressions": [
      {
        "name": "Wrist Circles",
        "req": "10 por sentido"
      },
      {
        "name": "Wrist Push-up",
        "req": "10-15 reps",
        "current": true
      }
    ],
    "equipment": [
      "suelo"
    ],
    "formTips": "Progresión gradual. Detente si hay dolor agudo en la muñeca.",
    "recommendedLevel": "principiante",
    "grips": null,
    "variations": null,
    "rangeCriteria": null
  },
  {
    "id": "push-up",
    "name": "Push-up",
    "technicalName": "Push-up",
    "category": "empuje",
    "difficulty": 2.5,
    "type": "reps",
    "muscles": [
      "Pectoral mayor",
      "Tríceps braquial",
      "Deltoides anterior",
      "Core"
    ],
    "description": "Empuje horizontal básico. Cuerpo en línea recta, codos a ~45°, pecho cerca del suelo.",
    "progressions": [
      {
        "name": "Wall Push-up",
        "req": "8-15 reps",
        "next": true
      },
      {
        "name": "Incline Push-up",
        "req": "10-20 reps"
      },
      {
        "name": "Knee Push-up",
        "req": "10-20 reps"
      },
      {
        "name": "Push-up",
        "req": "15-30 reps",
        "current": true
      },
      {
        "name": "Diamond Push-up",
        "req": "10-20 reps"
      },
      {
        "name": "Archer Push-up",
        "req": "6-12 por lado"
      },
      {
        "name": "Pseudo Planche Push-up",
        "req": "8-15 reps"
      },
      {
        "name": "One-arm Push-up (asistido)",
        "req": "5-10 por lado"
      },
      {
        "name": "One-arm Push-up",
        "req": "3-8 por lado"
      }
    ],
    "equipment": [
      "suelo"
    ],
    "formTips": "Cuerpo en línea recta. Codos ~45°. No dejes caer la cadera ni arquees la lumbar.",
    "recommendedLevel": "principiante",
    "grips": null,
    "variations": null,
    "rangeCriteria": {
      "type": "reps",
      "basico": {
        "total": 10,
        "strict": 8
      },
      "intermedio": {
        "total": 20,
        "strict": 15
      },
      "avanzado": {
        "total": 40,
        "strict": 30
      },
      "elite": {
        "total": 60,
        "strict": 50
      }
    }
  },
  {
    "id": "wide-push-up",
    "name": "Wide Push-up",
    "technicalName": "Wide Push-up",
    "category": "empuje",
    "difficulty": 2.8,
    "type": "reps",
    "muscles": [
      "Pectoral mayor",
      "Deltoides"
    ],
    "description": "Manos más anchas que los hombros. Mayor énfasis pectoral.",
    "progressions": [
      {
        "name": "Push-up",
        "req": "12+ reps"
      },
      {
        "name": "Wide Push-up",
        "req": "10-20 reps",
        "current": true
      }
    ],
    "equipment": [
      "suelo"
    ],
    "formTips": "Manos más anchas que hombros. No dejes caer el pecho sin control.",
    "recommendedLevel": "principiante",
    "grips": null,
    "variations": null,
    "rangeCriteria": null
  },
  {
    "id": "dip",
    "name": "Dip",
    "technicalName": "Fondo en paralelas (Dip)",
    "category": "empuje",
    "difficulty": 3.5,
    "type": "reps",
    "muscles": [
      "Tríceps",
      "Pectoral mayor",
      "Deltoides anterior"
    ],
    "description": "Baja controlado hasta que hombros queden por debajo de los codos. Empuje vertical.",
    "progressions": [
      {
        "name": "Bench Dip",
        "req": "12-20 reps"
      },
      {
        "name": "Parallel Bar Dip (asistido)",
        "req": "8-15 reps"
      },
      {
        "name": "Dip",
        "req": "10-20 reps",
        "current": true
      },
      {
        "name": "Ring Dip",
        "req": "6-12 reps"
      },
      {
        "name": "Korean Dip",
        "req": "5-10 reps"
      }
    ],
    "equipment": [
      "paralelas"
    ],
    "formTips": "No encojas hombros. Pecho ligeramente adelante. Rango completo controlado.",
    "recommendedLevel": "intermedio",
    "grips": null,
    "variations": null,
    "rangeCriteria": {
      "type": "reps",
      "basico": {
        "total": 3,
        "strict": 1
      },
      "intermedio": {
        "total": 8,
        "strict": 5
      },
      "avanzado": {
        "total": 15,
        "strict": 12
      },
      "elite": {
        "total": 25,
        "strict": 20
      }
    }
  },
  {
    "id": "decline-push-up",
    "name": "Decline Push-up",
    "technicalName": "Decline Push-up",
    "category": "empuje",
    "difficulty": 3.5,
    "type": "reps",
    "muscles": [
      "Pectoral superior",
      "Deltoides",
      "Tríceps"
    ],
    "description": "Pies elevados. Más carga sobre hombros y pectoral superior.",
    "progressions": [
      {
        "name": "Push-up",
        "req": "15+ reps"
      },
      {
        "name": "Decline Push-up",
        "req": "10-20 reps",
        "current": true
      },
      {
        "name": "Pike Push-up",
        "req": "8-12 reps"
      }
    ],
    "equipment": [
      "suelo",
      "banco"
    ],
    "formTips": "Pies elevados. Más carga en hombros y pectoral superior.",
    "recommendedLevel": "intermedio",
    "grips": null,
    "variations": null,
    "rangeCriteria": null
  },
  {
    "id": "ring-support-hold",
    "name": "Ring Support Hold",
    "technicalName": "Soporte en anillas",
    "category": "empuje",
    "difficulty": 3.5,
    "type": "hold",
    "muscles": [
      "Tríceps",
      "Hombros",
      "Core",
      "Estabilizadores"
    ],
    "description": "Soporte estable sobre anillas con brazos bloqueados. Base de dips en anillas.",
    "progressions": [
      {
        "name": "Ring Support Hold",
        "req": "20-40 s",
        "current": true
      },
      {
        "name": "Ring Dip",
        "req": "5-10 reps"
      }
    ],
    "equipment": [
      "anillas"
    ],
    "formTips": "Anillas estables y quietas. Hombros empaquetados, codos bloqueados. No dejes que las anillas se abran.",
    "recommendedLevel": "intermedio",
    "grips": null,
    "variations": null,
    "rangeCriteria": {
      "type": "hold",
      "basico": {
        "hold": 10
      },
      "intermedio": {
        "hold": 20
      },
      "avanzado": {
        "hold": 40
      },
      "elite": {
        "hold": 60
      }
    }
  },
  {
    "id": "diamond-push-up",
    "name": "Diamond Push-up",
    "technicalName": "Diamond Push-up",
    "category": "empuje",
    "difficulty": 3.8,
    "type": "reps",
    "muscles": [
      "Tríceps braquial",
      "Pectoral mayor (porción interna)",
      "Deltoides"
    ],
    "description": "Manos juntas formando diamante bajo el pecho. Enfoque máximo en tríceps.",
    "progressions": [
      {
        "name": "Close-grip Push-up",
        "req": "12-20 reps"
      },
      {
        "name": "Diamond Push-up",
        "req": "10-20 reps",
        "current": true
      },
      {
        "name": "Ring Diamond Push-up",
        "req": "8-15 reps"
      }
    ],
    "equipment": [
      "suelo"
    ],
    "formTips": "Manos juntas bajo el pecho. Codos cerca del torso. Énfasis en tríceps.",
    "recommendedLevel": "intermedio",
    "grips": null,
    "variations": null,
    "rangeCriteria": null
  },
  {
    "id": "hindu-push-up",
    "name": "Hindu Push-up",
    "technicalName": "Hindu Push-up",
    "category": "empuje",
    "difficulty": 4,
    "type": "reps",
    "muscles": [
      "Pectoral",
      "Hombros",
      "Tríceps",
      "Core"
    ],
    "description": "Movimiento fluido de pica a flexión extendida.",
    "progressions": [
      {
        "name": "Push-up",
        "req": "12+ reps"
      },
      {
        "name": "Hindu Push-up",
        "req": "8-15 reps",
        "current": true
      }
    ],
    "equipment": [
      "suelo"
    ],
    "formTips": "Movimiento fluido. No bloquees la respiración en la transición.",
    "recommendedLevel": "intermedio",
    "grips": null,
    "variations": null,
    "rangeCriteria": null
  },
  {
    "id": "pike-push-up",
    "name": "Pike Push-up",
    "technicalName": "Pike Push-up",
    "category": "empuje",
    "difficulty": 4.2,
    "type": "reps",
    "muscles": [
      "Deltoides",
      "Tríceps",
      "Trapecio superior"
    ],
    "description": "Cadera elevada formando V invertida. Camino principal hacia el Handstand Push-up.",
    "progressions": [
      {
        "name": "Incline Pike Push-up",
        "req": "10-15 reps"
      },
      {
        "name": "Pike Push-up",
        "req": "8-15 reps",
        "current": true
      },
      {
        "name": "Elevated Pike Push-up",
        "req": "6-12 reps"
      },
      {
        "name": "Wall Handstand Push-up (parcial)",
        "req": "5-10 reps"
      },
      {
        "name": "Handstand Push-up",
        "req": "3-8 reps"
      }
    ],
    "equipment": [
      "suelo"
    ],
    "formTips": "Cadera alta, cabeza hacia el suelo entre las manos. Empuje vertical.",
    "recommendedLevel": "intermedio",
    "grips": null,
    "variations": null,
    "rangeCriteria": {
      "type": "reps",
      "basico": {
        "total": 5,
        "strict": 3
      },
      "intermedio": {
        "total": 10,
        "strict": 8
      },
      "avanzado": {
        "total": 20,
        "strict": 15
      },
      "elite": {
        "total": 30,
        "strict": 25
      }
    }
  },
  {
    "id": "elevated-pike-push-up",
    "name": "Elevated Pike Push-up",
    "technicalName": "Elevated Pike Push-up",
    "category": "empuje",
    "difficulty": 5.2,
    "type": "reps",
    "muscles": [
      "Deltoides",
      "Tríceps"
    ],
    "description": "Pies elevados. Aproxima el ángulo del HSPU.",
    "progressions": [
      {
        "name": "Pike Push-up",
        "req": "12+ reps"
      },
      {
        "name": "Elevated Pike Push-up",
        "req": "6-12 reps",
        "current": true
      },
      {
        "name": "Wall HSPU",
        "req": "5-8 reps"
      }
    ],
    "equipment": [
      "suelo",
      "banco"
    ],
    "formTips": "Pies elevados. Acerca el ángulo al del HSPU sin arquear la lumbar.",
    "recommendedLevel": "intermedio",
    "grips": null,
    "variations": null,
    "rangeCriteria": null
  },
  {
    "id": "ring-dip",
    "name": "Ring Dip",
    "technicalName": "Fondo en anillas",
    "category": "empuje",
    "difficulty": 5.5,
    "type": "reps",
    "muscles": [
      "Tríceps",
      "Pectoral",
      "Estabilizadores"
    ],
    "description": "Dip sobre anillas. Alta demanda de estabilidad.",
    "progressions": [
      {
        "name": "Dip",
        "req": "12+ reps"
      },
      {
        "name": "Ring Dip",
        "req": "6-12 reps",
        "current": true
      }
    ],
    "equipment": [
      "anillas"
    ],
    "formTips": "Anillas estables al final. Soporte activo antes de bajar.",
    "recommendedLevel": "intermedio",
    "grips": null,
    "variations": null,
    "rangeCriteria": null
  },
  {
    "id": "one-arm-push-up",
    "name": "One-arm Push-up",
    "technicalName": "One-arm Push-up",
    "category": "empuje",
    "difficulty": 7,
    "type": "reps",
    "muscles": [
      "Pectoral",
      "Tríceps",
      "Core",
      "Oblicuos"
    ],
    "description": "Empuje unilateral completo.",
    "progressions": [
      {
        "name": "Archer Push-up",
        "req": "8+ por lado"
      },
      {
        "name": "One-arm Push-up",
        "req": "3-8 por lado",
        "current": true
      }
    ],
    "equipment": [
      "suelo"
    ],
    "formTips": "Abre las piernas para estabilidad. Codo del brazo de apoyo cerca del cuerpo.",
    "recommendedLevel": "avanzado",
    "grips": null,
    "variations": null,
    "rangeCriteria": {
      "type": "reps",
      "basico": {
        "total": 1,
        "strict": 0
      },
      "intermedio": {
        "total": 3,
        "strict": 2
      },
      "avanzado": {
        "total": 8,
        "strict": 5
      },
      "elite": {
        "total": 15,
        "strict": 10
      }
    }
  },
  {
    "id": "hspu",
    "name": "Handstand Push-up (HSPU)",
    "technicalName": "Handstand Push-up (HSPU)",
    "category": "empuje",
    "difficulty": 8,
    "type": "reps",
    "muscles": [
      "Deltoides",
      "Tríceps",
      "Trapecio",
      "Core"
    ],
    "description": "Flexión completa en posición invertida. Requiere Handstand sólido.",
    "progressions": [
      {
        "name": "Pike Push-up",
        "req": "12+ reps"
      },
      {
        "name": "Elevated Pike Push-up",
        "req": "8+ reps"
      },
      {
        "name": "Wall HSPU (parcial)",
        "req": "5-10 reps"
      },
      {
        "name": "Wall HSPU",
        "req": "5-12 reps"
      },
      {
        "name": "Free HSPU",
        "req": "3-8 reps",
        "current": true
      }
    ],
    "equipment": [
      "suelo",
      "pared"
    ],
    "formTips": "Alineación de handstand antes de flexionar. Baja con control hacia el suelo.",
    "recommendedLevel": "avanzado",
    "grips": null,
    "variations": null,
    "rangeCriteria": {
      "type": "reps",
      "basico": {
        "total": 1,
        "strict": 0
      },
      "intermedio": {
        "total": 3,
        "strict": 2
      },
      "avanzado": {
        "total": 8,
        "strict": 5
      },
      "elite": {
        "total": 15,
        "strict": 10
      }
    }
  },
  {
    "id": "dead-hang",
    "name": "Dead Hang",
    "technicalName": "Colgado pasivo (Dead Hang)",
    "category": "tiron",
    "difficulty": 1,
    "type": "hold",
    "muscles": [
      "Agarre",
      "Hombros",
      "Espalda alta"
    ],
    "description": "Cuelga relajado de la barra. Mejora agarre, movilidad de hombro y descompresión.",
    "progressions": [
      {
        "name": "Dead Hang",
        "req": "30-90 s",
        "current": true
      },
      {
        "name": "Active Hang",
        "req": "20-40 s"
      },
      {
        "name": "One-arm Hang",
        "req": "10-30 s por brazo"
      }
    ],
    "equipment": [
      "barra"
    ],
    "formTips": "Hombros relajados. Respira. No te balances innecesariamente.",
    "recommendedLevel": "principiante",
    "grips": null,
    "variations": null,
    "rangeCriteria": null
  },
  {
    "id": "australian-row",
    "name": "Australian Row",
    "technicalName": "Remo australiano (Australian Row / Inverted Row)",
    "category": "tiron",
    "difficulty": 2,
    "type": "reps",
    "muscles": [
      "Dorsal ancho",
      "Romboides",
      "Bíceps",
      "Core"
    ],
    "description": "Tirón horizontal con barra baja. Excelente progresión y complemento.",
    "progressions": [
      {
        "name": "High Australian Row",
        "req": "12-20 reps"
      },
      {
        "name": "Australian Row",
        "req": "10-15 reps",
        "current": true
      },
      {
        "name": "Feet-elevated Row",
        "req": "8-12 reps"
      },
      {
        "name": "Archer Row",
        "req": "6-10 por lado"
      }
    ],
    "equipment": [
      "barra"
    ],
    "formTips": "Cuerpo rígido. Tira pecho a la barra. Escápulas juntas al final.",
    "recommendedLevel": "principiante",
    "grips": null,
    "variations": null,
    "rangeCriteria": {
      "type": "reps",
      "basico": {
        "total": 8,
        "strict": 6
      },
      "intermedio": {
        "total": 12,
        "strict": 10
      },
      "avanzado": {
        "total": 20,
        "strict": 15
      },
      "elite": {
        "total": 30,
        "strict": 25
      }
    }
  },
  {
    "id": "face-pull-band",
    "name": "Band Face Pull",
    "technicalName": "Face pull con banda",
    "category": "tiron",
    "difficulty": 2,
    "type": "reps",
    "muscles": [
      "Deltoides posterior",
      "Romboides",
      "Trapecio medio"
    ],
    "description": "Tirón hacia la cara con banda. Salud de hombro y postura.",
    "progressions": [
      {
        "name": "Band Face Pull",
        "req": "12-20 reps",
        "current": true
      }
    ],
    "equipment": [
      "banda"
    ],
    "formTips": "Codos altos. Separa las manos al final. No encojas trapecio superior.",
    "recommendedLevel": "principiante",
    "grips": null,
    "variations": null,
    "rangeCriteria": null
  },
  {
    "id": "y-raise",
    "name": "Y-Raise",
    "technicalName": "Y-raise (prone)",
    "category": "tiron",
    "difficulty": 2.2,
    "type": "reps",
    "muscles": [
      "Deltoides",
      "Trapecio inferior",
      "Romboides"
    ],
    "description": "Boca abajo, eleva brazos en forma de Y. Estabilidad escapular.",
    "progressions": [
      {
        "name": "Y-Raise",
        "req": "10-15 reps",
        "current": true
      }
    ],
    "equipment": [
      "suelo"
    ],
    "formTips": "Pulgares arriba. No uses impulso de la lumbar.",
    "recommendedLevel": "principiante",
    "grips": null,
    "variations": null,
    "rangeCriteria": null
  },
  {
    "id": "scapular-pull-up",
    "name": "Scapular Pull-up",
    "technicalName": "Scapular Pull-up",
    "category": "tiron",
    "difficulty": 2.3,
    "type": "reps",
    "muscles": [
      "Dorsal ancho",
      "Romboides",
      "Trapecio inferior"
    ],
    "description": "Desde colgado, deprime y retrae omóplatos sin flexionar codos. Base del pull-up.",
    "progressions": [
      {
        "name": "Active Hang",
        "req": "20+ s"
      },
      {
        "name": "Scapular Pull-up",
        "req": "10-15 reps",
        "current": true
      },
      {
        "name": "Australian Row",
        "req": "10-15 reps"
      }
    ],
    "equipment": [
      "barra"
    ],
    "formTips": "Solo movimiento de omóplatos. Codos bloqueados. No hagas un pull-up parcial.",
    "recommendedLevel": "principiante",
    "grips": null,
    "variations": null,
    "rangeCriteria": null
  },
  {
    "id": "chin-up",
    "name": "Chin-up",
    "technicalName": "Dominada supina (Chin-up)",
    "category": "tiron",
    "difficulty": 3.5,
    "type": "reps",
    "muscles": [
      "Bíceps braquial",
      "Dorsal ancho",
      "Braquial"
    ],
    "description": "Agarre supino. Mayor énfasis en bíceps que el Pull-up.",
    "progressions": [
      {
        "name": "Australian Chin-up",
        "req": "10-15 reps"
      },
      {
        "name": "Negative Chin-up",
        "req": "5-8 reps"
      },
      {
        "name": "Chin-up",
        "req": "8-15 reps",
        "current": true
      },
      {
        "name": "Weighted Chin-up",
        "req": "5-10 reps"
      }
    ],
    "equipment": [
      "barra"
    ],
    "formTips": "Agarre supino. Evita el balanceo. Rango completo.",
    "recommendedLevel": "intermedio",
    "grips": [
      "Supino"
    ],
    "variations": null,
    "rangeCriteria": {
      "type": "reps",
      "basico": {
        "total": 3,
        "strict": 2
      },
      "intermedio": {
        "total": 8,
        "strict": 6
      },
      "avanzado": {
        "total": 15,
        "strict": 12
      },
      "elite": {
        "total": 25,
        "strict": 20
      }
    }
  },
  {
    "id": "pull-up",
    "name": "Pull-up",
    "technicalName": "Dominada prona (Pull-up)",
    "category": "tiron",
    "difficulty": 3.8,
    "type": "reps",
    "muscles": [
      "Dorsal ancho",
      "Bíceps",
      "Romboides",
      "Core"
    ],
    "description": "Agarre prono, sube hasta que la barbilla supere la barra. Base fundamental.",
    "progressions": [
      {
        "name": "Dead Hang",
        "req": "30-60 s"
      },
      {
        "name": "Scapular Pull-up",
        "req": "10-15 reps"
      },
      {
        "name": "Australian Row",
        "req": "10-15 reps"
      },
      {
        "name": "Negative Pull-up",
        "req": "5-8 reps (3-5 s)"
      },
      {
        "name": "Band-assisted Pull-up",
        "req": "6-12 reps"
      },
      {
        "name": "Pull-up",
        "req": "8-15 reps",
        "current": true
      },
      {
        "name": "Chest-to-bar Pull-up",
        "req": "5-10 reps"
      },
      {
        "name": "Weighted Pull-up",
        "req": "5-10 reps"
      },
      {
        "name": "Archer Pull-up",
        "req": "4-8 por lado"
      },
      {
        "name": "One-arm Pull-up",
        "req": "1-5 por lado"
      }
    ],
    "equipment": [
      "barra"
    ],
    "formTips": "Escápulas activas al iniciar. Barbilla por encima de la barra. Baja completo.",
    "recommendedLevel": "intermedio",
    "grips": [
      "Prono",
      "Ancho",
      "Estrecho"
    ],
    "variations": null,
    "rangeCriteria": {
      "type": "reps",
      "basico": {
        "total": 3,
        "strict": 2
      },
      "intermedio": {
        "total": 8,
        "strict": 6
      },
      "avanzado": {
        "total": 15,
        "strict": 12
      },
      "elite": {
        "total": 25,
        "strict": 20
      }
    }
  },
  {
    "id": "false-grip-hang",
    "name": "False Grip Hang",
    "technicalName": "Colgado en false grip",
    "category": "tiron",
    "difficulty": 3.8,
    "type": "hold",
    "muscles": [
      "Agarre",
      "Muñecas",
      "Antebrazos"
    ],
    "description": "Colgado con muñeca por encima de la barra/anilla. Clave para muscle-up estricto.",
    "progressions": [
      {
        "name": "Dead Hang",
        "req": "45+ s"
      },
      {
        "name": "False Grip Hang",
        "req": "15-40 s",
        "current": true
      },
      {
        "name": "False Grip Pull-up",
        "req": "3-6 reps"
      }
    ],
    "equipment": [
      "barra",
      "anillas"
    ],
    "formTips": "Muñeca por encima de la barra/anilla. Antebrazo vertical. Progresa el tiempo antes de tirar en false grip.",
    "recommendedLevel": "intermedio",
    "grips": [
      "False grip"
    ],
    "variations": null,
    "rangeCriteria": {
      "type": "hold",
      "basico": {
        "hold": 5
      },
      "intermedio": {
        "hold": 15
      },
      "avanzado": {
        "hold": 30
      },
      "elite": {
        "hold": 45
      }
    }
  },
  {
    "id": "chest-to-bar",
    "name": "Chest-to-Bar Pull-up",
    "technicalName": "Dominada pecho a barra",
    "category": "tiron",
    "difficulty": 5,
    "type": "reps",
    "muscles": [
      "Dorsal ancho",
      "Bíceps",
      "Trapecio medio"
    ],
    "description": "Lleva el pecho hasta la barra.",
    "progressions": [
      {
        "name": "Pull-up",
        "req": "10+ reps"
      },
      {
        "name": "Chest-to-bar Pull-up",
        "req": "5-10 reps",
        "current": true
      }
    ],
    "equipment": [
      "barra"
    ],
    "formTips": "Lleva el pecho a la barra sin arquear en exceso la lumbar.",
    "recommendedLevel": "intermedio",
    "grips": null,
    "variations": null,
    "rangeCriteria": null
  },
  {
    "id": "commando-pull-up",
    "name": "Commando Pull-up",
    "technicalName": "Dominada commando",
    "category": "tiron",
    "difficulty": 5.2,
    "type": "reps",
    "muscles": [
      "Dorsal",
      "Bíceps",
      "Core"
    ],
    "description": "Cuerpo perpendicular a la barra, alternando lado.",
    "progressions": [
      {
        "name": "Pull-up",
        "req": "10+ reps"
      },
      {
        "name": "Commando Pull-up",
        "req": "5-10 por lado",
        "current": true
      }
    ],
    "equipment": [
      "barra"
    ],
    "formTips": "Alterna el lado de la cabeza. Controla el giro del tronco.",
    "recommendedLevel": "intermedio",
    "grips": null,
    "variations": null,
    "rangeCriteria": null
  },
  {
    "id": "typewriter-pull-up",
    "name": "Typewriter Pull-up",
    "technicalName": "Dominada typewriter",
    "category": "tiron",
    "difficulty": 6.8,
    "type": "reps",
    "muscles": [
      "Dorsal ancho",
      "Bíceps"
    ],
    "description": "En la parte alta, desplazamiento lateral sobre la barra.",
    "progressions": [
      {
        "name": "Pull-up",
        "req": "12+ reps"
      },
      {
        "name": "Typewriter Pull-up",
        "req": "4-8 reps",
        "current": true
      }
    ],
    "equipment": [
      "barra"
    ],
    "formTips": "Mantén la barbilla alta mientras te desplazas lateralmente.",
    "recommendedLevel": "avanzado",
    "grips": null,
    "variations": null,
    "rangeCriteria": null
  },
  {
    "id": "one-arm-pull-up",
    "name": "One-arm Pull-up",
    "technicalName": "Dominada a una mano",
    "category": "tiron",
    "difficulty": 9,
    "type": "reps",
    "muscles": [
      "Dorsal ancho",
      "Bíceps",
      "Core",
      "Agarre"
    ],
    "description": "Tirón unilateral completo. Fuerza relativa de élite.",
    "progressions": [
      {
        "name": "Archer Pull-up",
        "req": "6+ por lado"
      },
      {
        "name": "One-arm Pull-up",
        "req": "1-5 por lado",
        "current": true
      }
    ],
    "equipment": [
      "barra"
    ],
    "formTips": "Hombro empaquetado. Core firme. Asistencia progresiva recomendada.",
    "recommendedLevel": "avanzado",
    "grips": null,
    "variations": null,
    "rangeCriteria": {
      "type": "reps",
      "basico": {
        "total": 1,
        "strict": 0
      },
      "intermedio": {
        "total": 1,
        "strict": 1
      },
      "avanzado": {
        "total": 3,
        "strict": 2
      },
      "elite": {
        "total": 8,
        "strict": 5
      }
    }
  },
  {
    "id": "calf-raise",
    "name": "Calf Raise",
    "technicalName": "Calf Raise",
    "category": "piernas",
    "difficulty": 1,
    "type": "reps",
    "muscles": [
      "Gemelos"
    ],
    "description": "De puntillas, controlado. Progresa a una pierna.",
    "progressions": [
      {
        "name": "Calf Raise",
        "req": "20-30 reps",
        "current": true
      },
      {
        "name": "Single-leg Calf Raise",
        "req": "12-20 por lado"
      }
    ],
    "equipment": [
      "suelo"
    ],
    "formTips": "Rango completo. Pausa arriba. Talón bajo al fondo.",
    "recommendedLevel": "principiante",
    "grips": null,
    "variations": null,
    "rangeCriteria": null
  },
  {
    "id": "glute-bridge",
    "name": "Glute Bridge",
    "technicalName": "Glute Bridge",
    "category": "piernas",
    "difficulty": 1.2,
    "type": "reps",
    "muscles": [
      "Glúteos",
      "Isquiotibiales",
      "Core"
    ],
    "description": "Elevación de cadera desde el suelo. Base de la cadena posterior y activación de glúteos.",
    "progressions": [
      {
        "name": "Glute Bridge",
        "req": "15-25 reps",
        "current": true
      },
      {
        "name": "Single-leg Bridge",
        "req": "10-15 por lado"
      },
      {
        "name": "Hip Thrust (elevado)",
        "req": "12-20 reps"
      }
    ],
    "equipment": [
      "suelo"
    ],
    "formTips": "Empuja con los talones. Aprieta glúteos arriba. No hiperextiendas la lumbar.",
    "recommendedLevel": "principiante",
    "grips": null,
    "variations": null,
    "rangeCriteria": {
      "type": "reps",
      "basico": {
        "total": 10,
        "strict": 8
      },
      "intermedio": {
        "total": 20,
        "strict": 15
      },
      "avanzado": {
        "total": 30,
        "strict": 25
      },
      "elite": {
        "total": 40,
        "strict": 35
      }
    }
  },
  {
    "id": "short-squat",
    "name": "Short Squat",
    "technicalName": "Short Squat (Partial Squat)",
    "category": "piernas",
    "difficulty": 1.2,
    "type": "reps",
    "muscles": [
      "Quadriceps",
      "Glutes"
    ],
    "description": "Partial-range squat, typically above parallel. Useful entry point for beginners or high-rep conditioning.",
    "progressions": [
      {
        "name": "Short Squat",
        "req": "15-25 reps",
        "current": true
      },
      {
        "name": "Squat (parallel)",
        "req": "15-20 reps"
      },
      {
        "name": "Deep Squat",
        "req": "12-20 reps"
      }
    ],
    "equipment": [
      "suelo"
    ],
    "formTips": "Controlled tempo. Knees aligned with feet. Do not bounce out of the bottom.",
    "recommendedLevel": "principiante",
    "grips": null,
    "variations": null,
    "rangeCriteria": {
      "type": "reps",
      "basico": {
        "total": 15,
        "strict": 12
      },
      "intermedio": {
        "total": 30,
        "strict": 25
      },
      "avanzado": {
        "total": 50,
        "strict": 40
      },
      "elite": {
        "total": 80,
        "strict": 60
      }
    }
  },
  {
    "id": "squat",
    "name": "Squat",
    "technicalName": "Sentadilla con peso corporal",
    "category": "piernas",
    "difficulty": 1.5,
    "type": "reps",
    "muscles": [
      "Cuádriceps",
      "Glúteos",
      "Isquiotibiales"
    ],
    "description": "Movimiento fundamental de piernas. Profundidad completa si la movilidad lo permite.",
    "progressions": [
      {
        "name": "Assisted Squat",
        "req": "15-20 reps"
      },
      {
        "name": "Bodyweight Squat",
        "req": "20-40 reps",
        "current": true
      },
      {
        "name": "Jump Squat",
        "req": "10-20 reps"
      },
      {
        "name": "Bulgarian Split Squat",
        "req": "8-15 por lado"
      },
      {
        "name": "Pistol Squat",
        "req": "5-10 por lado"
      }
    ],
    "equipment": [
      "suelo"
    ],
    "formTips": "Rodillas en línea con los pies. Profundidad según movilidad de tobillo.",
    "recommendedLevel": "principiante",
    "grips": null,
    "variations": null,
    "rangeCriteria": {
      "type": "reps",
      "basico": {
        "total": 15,
        "strict": 12
      },
      "intermedio": {
        "total": 30,
        "strict": 25
      },
      "avanzado": {
        "total": 50,
        "strict": 40
      },
      "elite": {
        "total": 100,
        "strict": 80
      }
    }
  },
  {
    "id": "heel-walk",
    "name": "Heel Walk",
    "technicalName": "Heel Walk",
    "category": "piernas",
    "difficulty": 1.5,
    "type": "reps",
    "muscles": [
      "Tibialis anterior",
      "Ankles",
      "Calves"
    ],
    "description": "Walk on your heels with toes lifted. Strengthens the tibialis anterior and improves ankle control and lower-leg balance.",
    "progressions": [
      {
        "name": "Heel Raise Hold",
        "req": "20-30 s"
      },
      {
        "name": "Heel Walk",
        "req": "20-40 steps",
        "current": true
      },
      {
        "name": "Single-leg Calf Raise",
        "req": "12-20 per side"
      }
    ],
    "equipment": [
      "suelo"
    ],
    "formTips": "Toes pointed up. Short controlled steps. Upright torso. Do not let the toes drop.",
    "recommendedLevel": "principiante",
    "grips": null,
    "variations": null,
    "rangeCriteria": {
      "type": "reps",
      "basico": {
        "total": 15,
        "strict": 10
      },
      "intermedio": {
        "total": 30,
        "strict": 25
      },
      "avanzado": {
        "total": 50,
        "strict": 40
      },
      "elite": {
        "total": 80,
        "strict": 60
      }
    }
  },
  {
    "id": "wall-sit",
    "name": "Wall Sit",
    "technicalName": "Wall Sit",
    "category": "piernas",
    "difficulty": 2,
    "type": "hold",
    "muscles": [
      "Cuádriceps",
      "Glúteos"
    ],
    "description": "Isométrico con espalda en la pared, muslos paralelos.",
    "progressions": [
      {
        "name": "Wall Sit",
        "req": "30-60 s",
        "current": true
      }
    ],
    "equipment": [
      "pared"
    ],
    "formTips": "Muslos paralelos. Espalda pegada a la pared. Rodillas a 90°.",
    "recommendedLevel": "principiante",
    "grips": null,
    "variations": null,
    "rangeCriteria": null
  },
  {
    "id": "single-leg-calf-raise",
    "name": "Single-leg Calf Raise",
    "technicalName": "Single-leg Calf Raise",
    "category": "piernas",
    "difficulty": 2.2,
    "type": "reps",
    "muscles": [
      "Gemelos"
    ],
    "description": "Variante unilateral de elevación de gemelos.",
    "progressions": [
      {
        "name": "Calf Raise",
        "req": "25+ reps"
      },
      {
        "name": "Single-leg Calf Raise",
        "req": "12-20 por lado",
        "current": true
      }
    ],
    "equipment": [
      "suelo"
    ],
    "formTips": "Equilibrio estable. Apoyo ligero de dedos si hace falta.",
    "recommendedLevel": "principiante",
    "grips": null,
    "variations": null,
    "rangeCriteria": null
  },
  {
    "id": "reverse-lunge",
    "name": "Reverse Lunge",
    "technicalName": "Zancada inversa",
    "category": "piernas",
    "difficulty": 2.4,
    "type": "reps",
    "muscles": [
      "Cuádriceps",
      "Glúteos"
    ],
    "description": "Paso hacia atrás. Más amable con la rodilla delantera.",
    "progressions": [
      {
        "name": "Lunge",
        "req": "10+ por lado"
      },
      {
        "name": "Reverse Lunge",
        "req": "10-15 por lado",
        "current": true
      }
    ],
    "equipment": [
      "suelo"
    ],
    "formTips": "Paso atrás controlado. Rodilla trasera cerca del suelo.",
    "recommendedLevel": "principiante",
    "grips": null,
    "variations": null,
    "rangeCriteria": null
  },
  {
    "id": "good-morning-bw",
    "name": "Bodyweight Good Morning",
    "technicalName": "Good morning con peso corporal",
    "category": "piernas",
    "difficulty": 2.5,
    "type": "reps",
    "muscles": [
      "Isquiotibiales",
      "Glúteos",
      "Espalda baja"
    ],
    "description": "Bisagra de cadera con manos detrás de la cabeza. Cadena posterior.",
    "progressions": [
      {
        "name": "Bodyweight Good Morning",
        "req": "12-20 reps",
        "current": true
      },
      {
        "name": "Single-leg RDL",
        "req": "8-12 por lado"
      }
    ],
    "equipment": [
      "suelo"
    ],
    "formTips": "Cadera atrás, espalda neutra, rodillas ligeramente flexionadas.",
    "recommendedLevel": "principiante",
    "grips": null,
    "variations": null,
    "rangeCriteria": null
  },
  {
    "id": "deep-squat",
    "name": "Deep Squat",
    "technicalName": "Deep Squat (Ass-to-Grass)",
    "category": "piernas",
    "difficulty": 2.5,
    "type": "reps",
    "muscles": [
      "Quadriceps",
      "Glutes",
      "Adductors",
      "Ankles"
    ],
    "description": "Full-depth bodyweight squat with hips below parallel (ass-to-grass). Mobility and strength through full range.",
    "progressions": [
      {
        "name": "Short Squat",
        "req": "15-20 reps"
      },
      {
        "name": "Squat (parallel)",
        "req": "15-25 reps"
      },
      {
        "name": "Deep Squat",
        "req": "12-20 reps",
        "current": true
      },
      {
        "name": "Pistol Squat",
        "req": "5-8 per side"
      }
    ],
    "equipment": [
      "suelo"
    ],
    "formTips": "Heels down. Knees track over toes. Upright as mobility allows. Full depth without lumbar collapse.",
    "recommendedLevel": "principiante",
    "grips": null,
    "variations": null,
    "rangeCriteria": {
      "type": "reps",
      "basico": {
        "total": 10,
        "strict": 8
      },
      "intermedio": {
        "total": 20,
        "strict": 15
      },
      "avanzado": {
        "total": 40,
        "strict": 30
      },
      "elite": {
        "total": 60,
        "strict": 50
      }
    }
  },
  {
    "id": "jump-squat",
    "name": "Jump Squat",
    "technicalName": "Sentadilla con salto",
    "category": "piernas",
    "difficulty": 2.8,
    "type": "reps",
    "muscles": [
      "Cuádriceps",
      "Glúteos",
      "Gemelos"
    ],
    "description": "Sentadilla explosiva con salto.",
    "progressions": [
      {
        "name": "Bodyweight Squat",
        "req": "20+ reps"
      },
      {
        "name": "Jump Squat",
        "req": "10-20 reps",
        "current": true
      }
    ],
    "equipment": [
      "suelo"
    ],
    "formTips": "Aterriza suave. Amortigua con las rodillas. No dejes que colapsen hacia dentro.",
    "recommendedLevel": "principiante",
    "grips": null,
    "variations": null,
    "rangeCriteria": null
  },
  {
    "id": "lateral-lunge",
    "name": "Lateral Lunge",
    "technicalName": "Zancada lateral",
    "category": "piernas",
    "difficulty": 2.8,
    "type": "reps",
    "muscles": [
      "Cuádriceps",
      "Glúteos",
      "Aductores"
    ],
    "description": "Paso lateral con sentadilla unilateral.",
    "progressions": [
      {
        "name": "Bodyweight Squat",
        "req": "15+ reps"
      },
      {
        "name": "Lateral Lunge",
        "req": "8-12 por lado",
        "current": true
      }
    ],
    "equipment": [
      "suelo"
    ],
    "formTips": "Pie de apoyo plano. Cadera atrás. Tobillo móvil.",
    "recommendedLevel": "principiante",
    "grips": null,
    "variations": null,
    "rangeCriteria": null
  },
  {
    "id": "single-leg-bridge",
    "name": "Single-leg Glute Bridge",
    "technicalName": "Single-leg Glute Bridge",
    "category": "piernas",
    "difficulty": 2.8,
    "type": "reps",
    "muscles": [
      "Glúteos",
      "Isquiotibiales",
      "Core"
    ],
    "description": "Variante unilateral del puente de glúteos.",
    "progressions": [
      {
        "name": "Glute Bridge",
        "req": "20+ reps"
      },
      {
        "name": "Single-leg Glute Bridge",
        "req": "10-15 por lado",
        "current": true
      }
    ],
    "equipment": [
      "suelo"
    ],
    "formTips": "Cadera cuadrada. No dejes que se tuerza hacia un lado.",
    "recommendedLevel": "principiante",
    "grips": null,
    "variations": null,
    "rangeCriteria": null
  },
  {
    "id": "single-leg-rdl",
    "name": "Single-leg RDL",
    "technicalName": "Peso muerto rumano a una pierna",
    "category": "piernas",
    "difficulty": 4,
    "type": "reps",
    "muscles": [
      "Isquiotibiales",
      "Glúteos",
      "Equilibrio"
    ],
    "description": "Bisagra unilateral. Equilibrio y fuerza de cadena posterior.",
    "progressions": [
      {
        "name": "Bodyweight Good Morning",
        "req": "15+ reps"
      },
      {
        "name": "Single-leg RDL (asistido)",
        "req": "8-12 por lado"
      },
      {
        "name": "Single-leg RDL",
        "req": "8-12 por lado",
        "current": true
      }
    ],
    "equipment": [
      "suelo"
    ],
    "formTips": "Cadera cuadrada. Pierna libre en línea con el torso.",
    "recommendedLevel": "intermedio",
    "grips": null,
    "variations": null,
    "rangeCriteria": null
  },
  {
    "id": "bulgarian-split",
    "name": "Bulgarian Split Squat",
    "technicalName": "Bulgarian Split Squat",
    "category": "piernas",
    "difficulty": 4,
    "type": "reps",
    "muscles": [
      "Cuádriceps",
      "Glúteos"
    ],
    "description": "Pie trasero elevado. Unilateral exigente y muy transferible.",
    "progressions": [
      {
        "name": "Reverse Lunge",
        "req": "12+ por lado"
      },
      {
        "name": "Bulgarian Split Squat",
        "req": "8-15 por lado",
        "current": true
      },
      {
        "name": "Pistol Squat",
        "req": "5-8 por lado"
      }
    ],
    "equipment": [
      "suelo",
      "banco"
    ],
    "formTips": "Torso ligeramente inclinado. Rodilla delantera estable.",
    "recommendedLevel": "intermedio",
    "grips": null,
    "variations": null,
    "rangeCriteria": null
  },
  {
    "id": "sissy-squat",
    "name": "Sissy Squat",
    "technicalName": "Sissy Squat",
    "category": "piernas",
    "difficulty": 4.5,
    "type": "reps",
    "muscles": [
      "Quadriceps",
      "Hip flexors",
      "Core"
    ],
    "description": "Knee-dominant squat variation leaning backward with heels elevated or free. Isolates the quadriceps.",
    "progressions": [
      {
        "name": "Short Squat",
        "req": "20+ reps"
      },
      {
        "name": "Sissy Squat (assisted)",
        "req": "8-12 reps"
      },
      {
        "name": "Sissy Squat",
        "req": "8-15 reps",
        "current": true
      }
    ],
    "equipment": [
      "suelo"
    ],
    "formTips": "Hips extended, lean back as knees travel forward. Control the eccentric. Hold a support if needed at first.",
    "recommendedLevel": "intermedio",
    "grips": null,
    "variations": null,
    "rangeCriteria": {
      "type": "reps",
      "basico": {
        "total": 5,
        "strict": 3
      },
      "intermedio": {
        "total": 10,
        "strict": 8
      },
      "avanzado": {
        "total": 15,
        "strict": 12
      },
      "elite": {
        "total": 25,
        "strict": 20
      }
    }
  },
  {
    "id": "shrimp-squat",
    "name": "Shrimp Squat",
    "technicalName": "Shrimp Squat",
    "category": "piernas",
    "difficulty": 6,
    "type": "reps",
    "muscles": [
      "Cuádriceps",
      "Glúteos",
      "Equilibrio"
    ],
    "description": "Sentadilla unilateral con pie trasero sujetado.",
    "progressions": [
      {
        "name": "Bulgarian Split Squat",
        "req": "10+ por lado"
      },
      {
        "name": "Shrimp Squat",
        "req": "5-10 por lado",
        "current": true
      }
    ],
    "equipment": [
      "suelo"
    ],
    "formTips": "Pie trasero sujetado. Equilibrio y control en todo el rango.",
    "recommendedLevel": "avanzado",
    "grips": null,
    "variations": null,
    "rangeCriteria": null
  },
  {
    "id": "pistol-squat",
    "name": "Pistol Squat",
    "technicalName": "Sentadilla a una pierna (Pistol)",
    "category": "piernas",
    "difficulty": 6.5,
    "type": "reps",
    "muscles": [
      "Cuádriceps",
      "Glúteos",
      "Core",
      "Equilibrio"
    ],
    "description": "Sentadilla completa a una sola pierna. Requiere fuerza, movilidad y equilibrio.",
    "progressions": [
      {
        "name": "Assisted Pistol",
        "req": "6-10 por lado"
      },
      {
        "name": "Box Pistol",
        "req": "6-10 por lado"
      },
      {
        "name": "Pistol Squat",
        "req": "5-10 por lado",
        "current": true
      },
      {
        "name": "Weighted Pistol",
        "req": "3-6 por lado"
      }
    ],
    "equipment": [
      "suelo"
    ],
    "formTips": "Brazo adelante como contrapeso. Talón pegado. Rodilla alineada.",
    "recommendedLevel": "avanzado",
    "grips": null,
    "variations": null,
    "rangeCriteria": {
      "type": "reps",
      "basico": {
        "total": 1,
        "strict": 0
      },
      "intermedio": {
        "total": 3,
        "strict": 2
      },
      "avanzado": {
        "total": 8,
        "strict": 5
      },
      "elite": {
        "total": 15,
        "strict": 10
      }
    }
  },
  {
    "id": "nordic-curl",
    "name": "Nordic Curl",
    "technicalName": "Nordic hamstring curl",
    "category": "piernas",
    "difficulty": 6.5,
    "type": "reps",
    "muscles": [
      "Isquiotibiales"
    ],
    "description": "Arrodillado, baja el torso controlado. Excelente para isquios y prevención de lesiones.",
    "progressions": [
      {
        "name": "Nordic Curl (asistido)",
        "req": "6-10 reps"
      },
      {
        "name": "Nordic Curl (negativo)",
        "req": "5-8 reps"
      },
      {
        "name": "Nordic Curl",
        "req": "5-10 reps",
        "current": true
      }
    ],
    "equipment": [
      "suelo"
    ],
    "formTips": "Controla la bajada. Asistencia de banda o manos al inicio.",
    "recommendedLevel": "avanzado",
    "grips": null,
    "variations": null,
    "rangeCriteria": {
      "type": "reps",
      "basico": {
        "total": 1,
        "strict": 0
      },
      "intermedio": {
        "total": 3,
        "strict": 2
      },
      "avanzado": {
        "total": 6,
        "strict": 4
      },
      "elite": {
        "total": 12,
        "strict": 8
      }
    }
  },
  {
    "id": "crunch",
    "name": "Crunch",
    "technicalName": "Crunch",
    "category": "core",
    "difficulty": 1.2,
    "type": "reps",
    "muscles": [
      "Recto abdominal"
    ],
    "description": "Flexión corta de tronco.",
    "progressions": [
      {
        "name": "Crunch",
        "req": "15-25 reps",
        "current": true
      }
    ],
    "equipment": [
      "suelo"
    ],
    "formTips": "Rango corto. No tires del cuello con las manos.",
    "recommendedLevel": "principiante",
    "grips": null,
    "variations": null,
    "rangeCriteria": null
  },
  {
    "id": "plank",
    "name": "Plank",
    "technicalName": "Plancha frontal (Plank)",
    "category": "core",
    "difficulty": 1.8,
    "type": "hold",
    "muscles": [
      "Core",
      "Hombros",
      "Glúteos"
    ],
    "description": "Isométrico básico de anti-extensión. Cuerpo completamente recto.",
    "progressions": [
      {
        "name": "Knee Plank",
        "req": "30-45 s"
      },
      {
        "name": "Plank",
        "req": "45-90 s",
        "current": true
      },
      {
        "name": "RKC Plank",
        "req": "20-40 s"
      },
      {
        "name": "Weighted Plank",
        "req": "30-60 s"
      }
    ],
    "equipment": [
      "suelo"
    ],
    "formTips": "Empuja el suelo con las manos. Glúteos activos. Lumbar neutra.",
    "recommendedLevel": "principiante",
    "grips": null,
    "variations": null,
    "rangeCriteria": {
      "type": "hold",
      "basico": {
        "hold": 20
      },
      "intermedio": {
        "hold": 45
      },
      "avanzado": {
        "hold": 90
      },
      "elite": {
        "hold": 180
      }
    }
  },
  {
    "id": "bird-dog",
    "name": "Bird Dog",
    "technicalName": "Bird Dog",
    "category": "core",
    "difficulty": 1.8,
    "type": "reps",
    "muscles": [
      "Core",
      "Espalda baja",
      "Glúteos"
    ],
    "description": "A cuatro patas, extiende brazo y pierna opuestos.",
    "progressions": [
      {
        "name": "Bird Dog",
        "req": "10-15 por lado",
        "current": true
      }
    ],
    "equipment": [
      "suelo"
    ],
    "formTips": "Cadera estable. Extiende sin rotar el tronco.",
    "recommendedLevel": "principiante",
    "grips": null,
    "variations": null,
    "rangeCriteria": null
  },
  {
    "id": "dead-bug",
    "name": "Dead Bug",
    "technicalName": "Dead Bug",
    "category": "core",
    "difficulty": 2,
    "type": "reps",
    "muscles": [
      "Transverso",
      "Core profundo"
    ],
    "description": "Control anti-extensión con extremidades opuestas.",
    "progressions": [
      {
        "name": "Dead Bug",
        "req": "10-15 por lado",
        "current": true
      }
    ],
    "equipment": [
      "suelo"
    ],
    "formTips": "Espalda baja siempre pegada. Exhala al extender extremidades.",
    "recommendedLevel": "principiante",
    "grips": null,
    "variations": null,
    "rangeCriteria": null
  },
  {
    "id": "sit-up",
    "name": "Sit-up",
    "technicalName": "Sit-up",
    "category": "core",
    "difficulty": 2,
    "type": "reps",
    "muscles": [
      "Rectus abdominis",
      "Hip flexors"
    ],
    "description": "Classic full sit-up from lying to upright torso. Core flexion strength.",
    "progressions": [
      {
        "name": "Crunch",
        "req": "15-20 reps"
      },
      {
        "name": "Sit-up",
        "req": "12-20 reps",
        "current": true
      },
      {
        "name": "V-up",
        "req": "8-15 reps"
      }
    ],
    "equipment": [
      "suelo"
    ],
    "formTips": "Do not yank the neck. Controlled ascent and descent. Feet can be anchored or free depending on goal.",
    "recommendedLevel": "principiante",
    "grips": null,
    "variations": null,
    "rangeCriteria": {
      "type": "reps",
      "basico": {
        "total": 10,
        "strict": 8
      },
      "intermedio": {
        "total": 20,
        "strict": 15
      },
      "avanzado": {
        "total": 40,
        "strict": 30
      },
      "elite": {
        "total": 60,
        "strict": 50
      }
    }
  },
  {
    "id": "bicycle-crunch",
    "name": "Bicycle Crunch",
    "technicalName": "Crunch bicicleta",
    "category": "core",
    "difficulty": 2.2,
    "type": "reps",
    "muscles": [
      "Recto abdominal",
      "Oblicuos"
    ],
    "description": "Alterna codo a rodilla opuesta.",
    "progressions": [
      {
        "name": "Bicycle Crunch",
        "req": "15-25 por lado",
        "current": true
      }
    ],
    "equipment": [
      "suelo"
    ],
    "formTips": "Rotación controlada. Codo a rodilla opuesta sin tirones.",
    "recommendedLevel": "principiante",
    "grips": null,
    "variations": null,
    "rangeCriteria": null
  },
  {
    "id": "arch-hold",
    "name": "Arch Hold",
    "technicalName": "Arch Hold",
    "category": "core",
    "difficulty": 2.5,
    "type": "hold",
    "muscles": [
      "Espalda baja",
      "Glúteos",
      "Erectores"
    ],
    "description": "Posición opuesta al hollow. Extensión de cadena posterior.",
    "progressions": [
      {
        "name": "Arch Hold",
        "req": "20-40 s",
        "current": true
      }
    ],
    "equipment": [
      "suelo"
    ],
    "formTips": "Activa glúteos y espalda. No hiperextiendas el cuello.",
    "recommendedLevel": "principiante",
    "grips": null,
    "variations": null,
    "rangeCriteria": null
  },
  {
    "id": "russian-twist",
    "name": "Russian Twist",
    "technicalName": "Russian Twist",
    "category": "core",
    "difficulty": 2.5,
    "type": "reps",
    "muscles": [
      "Oblicuos",
      "Core"
    ],
    "description": "Rotación de tronco sentado.",
    "progressions": [
      {
        "name": "Russian Twist",
        "req": "15-25 por lado",
        "current": true
      }
    ],
    "equipment": [
      "suelo"
    ],
    "formTips": "Torso inclinado. Gira desde el tronco, no solo los brazos.",
    "recommendedLevel": "principiante",
    "grips": null,
    "variations": null,
    "rangeCriteria": null
  },
  {
    "id": "hanging-knee-raise",
    "name": "Hanging Knee Raise",
    "technicalName": "Hanging Knee Raise",
    "category": "core",
    "difficulty": 3,
    "type": "reps",
    "muscles": [
      "Recto abdominal",
      "Flexores de cadera"
    ],
    "description": "Desde la barra, sube rodillas hacia el pecho.",
    "progressions": [
      {
        "name": "Hanging Knee Raise",
        "req": "10-15 reps",
        "current": true
      },
      {
        "name": "Hanging Leg Raise",
        "req": "8-12 reps"
      }
    ],
    "equipment": [
      "barra"
    ],
    "formTips": "Mínimo balanceo. Rodillas al pecho con control.",
    "recommendedLevel": "intermedio",
    "grips": null,
    "variations": null,
    "rangeCriteria": null
  },
  {
    "id": "dead-bug-advanced",
    "name": "Advanced Dead Bug",
    "technicalName": "Advanced Dead Bug",
    "category": "core",
    "difficulty": 3.2,
    "type": "reps",
    "muscles": [
      "Transverso",
      "Core profundo"
    ],
    "description": "Dead bug con extremidades más extendidas o tempo lento.",
    "progressions": [
      {
        "name": "Dead Bug",
        "req": "12+ por lado"
      },
      {
        "name": "Dead Bug Advanced",
        "req": "8-12 por lado",
        "current": true
      }
    ],
    "equipment": [
      "suelo"
    ],
    "formTips": "Extensión más larga o tempo lento. Lumbar pegada en todo momento.",
    "recommendedLevel": "intermedio",
    "grips": null,
    "variations": null,
    "rangeCriteria": null
  },
  {
    "id": "hollow-body",
    "name": "Hollow Body Hold",
    "technicalName": "Hollow Body Hold",
    "category": "core",
    "difficulty": 3.5,
    "type": "hold",
    "muscles": [
      "Recto abdominal",
      "Transverso",
      "Flexores"
    ],
    "description": "Posición base de gimnasia. Espalda baja pegada al suelo, brazos y piernas extendidos.",
    "progressions": [
      {
        "name": "Tuck Hollow",
        "req": "30-45 s"
      },
      {
        "name": "Hollow Body Hold",
        "req": "30-60 s",
        "current": true
      },
      {
        "name": "Hollow Rocks",
        "req": "20-40 reps"
      }
    ],
    "equipment": [
      "suelo"
    ],
    "formTips": "Espalda baja pegada al suelo. Costillas abajo. Extiende sin arquear.",
    "recommendedLevel": "intermedio",
    "grips": null,
    "variations": null,
    "rangeCriteria": {
      "type": "hold",
      "basico": {
        "hold": 15
      },
      "intermedio": {
        "hold": 30
      },
      "avanzado": {
        "hold": 60
      },
      "elite": {
        "hold": 90
      }
    }
  },
  {
    "id": "v-up",
    "name": "V-up",
    "technicalName": "V-up",
    "category": "core",
    "difficulty": 3.8,
    "type": "reps",
    "muscles": [
      "Recto abdominal",
      "Flexores de cadera"
    ],
    "description": "Toca pies con manos formando una V.",
    "progressions": [
      {
        "name": "V-Up",
        "req": "8-15 reps",
        "current": true
      }
    ],
    "equipment": [
      "suelo"
    ],
    "formTips": "Piernas y torso suben juntos. Control en la bajada.",
    "recommendedLevel": "intermedio",
    "grips": null,
    "variations": null,
    "rangeCriteria": null
  },
  {
    "id": "hanging-leg-raise",
    "name": "Hanging Leg Raise",
    "technicalName": "Hanging Leg Raise",
    "category": "core",
    "difficulty": 4,
    "type": "reps",
    "muscles": [
      "Recto abdominal",
      "Flexores de cadera",
      "Oblicuos"
    ],
    "description": "Desde colgado, eleva piernas rectas o flexionadas hasta horizontal o más.",
    "progressions": [
      {
        "name": "Knee Raise",
        "req": "12-20 reps"
      },
      {
        "name": "Hanging Leg Raise",
        "req": "8-15 reps",
        "current": true
      },
      {
        "name": "Toes-to-Bar",
        "req": "6-12 reps"
      },
      {
        "name": "Windshield Wipers",
        "req": "6-10 por lado"
      }
    ],
    "equipment": [
      "barra"
    ],
    "formTips": "Piernas lo más rectas posible. No uses impulso excesivo.",
    "recommendedLevel": "intermedio",
    "grips": null,
    "variations": null,
    "rangeCriteria": null
  },
  {
    "id": "toes-to-bar",
    "name": "Toes-to-Bar",
    "technicalName": "Toes-to-Bar",
    "category": "core",
    "difficulty": 5,
    "type": "reps",
    "muscles": [
      "Core",
      "Flexores de cadera",
      "Dorsales"
    ],
    "description": "Lleva los pies a tocar la barra. Versión avanzada de elevaciones colgado.",
    "progressions": [
      {
        "name": "Hanging Knee Raise",
        "req": "12+ reps"
      },
      {
        "name": "Hanging Leg Raise",
        "req": "10+ reps"
      },
      {
        "name": "Toes-to-Bar",
        "req": "6-12 reps",
        "current": true
      },
      {
        "name": "Windshield Wipers",
        "req": "6-10 por lado"
      }
    ],
    "equipment": [
      "barra"
    ],
    "formTips": "Pies a la barra con control. Evita el kipping excesivo si buscas fuerza.",
    "recommendedLevel": "intermedio",
    "grips": null,
    "variations": null,
    "rangeCriteria": {
      "type": "reps",
      "basico": {
        "total": 3,
        "strict": 1
      },
      "intermedio": {
        "total": 8,
        "strict": 5
      },
      "avanzado": {
        "total": 15,
        "strict": 10
      },
      "elite": {
        "total": 25,
        "strict": 20
      }
    }
  },
  {
    "id": "l-sit",
    "name": "L-Sit",
    "technicalName": "L-Sit",
    "category": "core",
    "difficulty": 5.5,
    "type": "hold",
    "muscles": [
      "Core",
      "Flexores de cadera",
      "Tríceps",
      "Hombros"
    ],
    "description": "Soporte en manos con piernas extendidas en L. Compresión y fuerza de empuje.",
    "progressions": [
      {
        "name": "Tuck L-Sit",
        "req": "20-40 s"
      },
      {
        "name": "One-leg L-Sit",
        "req": "15-30 s"
      },
      {
        "name": "L-Sit",
        "req": "15-30 s",
        "current": true
      },
      {
        "name": "V-Sit",
        "req": "10-20 s"
      },
      {
        "name": "Manna",
        "req": "5-15 s"
      }
    ],
    "equipment": [
      "suelo",
      "paralelas"
    ],
    "formTips": "Hombros deprimidos. Piernas rectas y juntas. Empuja fuerte el suelo/paralelas.",
    "recommendedLevel": "intermedio",
    "grips": null,
    "variations": null,
    "rangeCriteria": {
      "type": "hold",
      "basico": {
        "hold": 5
      },
      "intermedio": {
        "hold": 15
      },
      "avanzado": {
        "hold": 30
      },
      "elite": {
        "hold": 60
      }
    }
  },
  {
    "id": "windshield-wipers",
    "name": "Windshield Wipers",
    "technicalName": "Windshield Wipers",
    "category": "core",
    "difficulty": 6,
    "type": "reps",
    "muscles": [
      "Oblicuos",
      "Core",
      "Dorsales"
    ],
    "description": "Piernas extendidas colgado con rotación lateral.",
    "progressions": [
      {
        "name": "Toes-to-Bar",
        "req": "8+ reps"
      },
      {
        "name": "Windshield Wipers",
        "req": "6-10 por lado",
        "current": true
      }
    ],
    "equipment": [
      "barra"
    ],
    "formTips": "Piernas extendidas. Rotación lenta. No sueltes la barra.",
    "recommendedLevel": "avanzado",
    "grips": null,
    "variations": null,
    "rangeCriteria": null
  },
  {
    "id": "v-sit",
    "name": "V-Sit",
    "technicalName": "V-Sit",
    "category": "core",
    "difficulty": 7,
    "type": "hold",
    "muscles": [
      "Core",
      "Flexores de cadera",
      "Tríceps"
    ],
    "description": "L-Sit con piernas más elevadas formando V.",
    "progressions": [
      {
        "name": "L-Sit",
        "req": "20+ s"
      },
      {
        "name": "V-Sit",
        "req": "10-20 s",
        "current": true
      }
    ],
    "equipment": [
      "suelo",
      "paralelas"
    ],
    "formTips": "Compresión máxima. Piernas elevadas por encima de horizontal.",
    "recommendedLevel": "avanzado",
    "grips": null,
    "variations": null,
    "rangeCriteria": {
      "type": "hold",
      "basico": {
        "hold": 3
      },
      "intermedio": {
        "hold": 10
      },
      "avanzado": {
        "hold": 20
      },
      "elite": {
        "hold": 40
      }
    }
  },
  {
    "id": "dragon-flag",
    "name": "Dragon Flag",
    "technicalName": "Dragon Flag",
    "category": "core",
    "difficulty": 7.5,
    "type": "reps",
    "muscles": [
      "Core completo",
      "Serrato",
      "Hombros"
    ],
    "description": "Cuerpo rígido invertido sujetado por los hombros. Popularizado por Bruce Lee.",
    "progressions": [
      {
        "name": "Tuck Dragon Flag",
        "req": "6-10 reps"
      },
      {
        "name": "Single-leg Dragon Flag",
        "req": "5-8 por lado"
      },
      {
        "name": "Dragon Flag",
        "req": "5-10 reps",
        "current": true
      }
    ],
    "equipment": [
      "banco"
    ],
    "formTips": "Cuerpo rígido como una tabla. Pivot solo en los hombros.",
    "recommendedLevel": "avanzado",
    "grips": null,
    "variations": null,
    "rangeCriteria": {
      "type": "reps",
      "basico": {
        "total": 1,
        "strict": 0
      },
      "intermedio": {
        "total": 3,
        "strict": 2
      },
      "avanzado": {
        "total": 8,
        "strict": 5
      },
      "elite": {
        "total": 15,
        "strict": 10
      }
    }
  },
  {
    "id": "frog-stand",
    "name": "Frog Stand",
    "technicalName": "Frog Stand",
    "category": "skills",
    "difficulty": 2.5,
    "type": "hold",
    "muscles": [
      "Hombros",
      "Core",
      "Muñecas"
    ],
    "description": "Equilibrio en manos con rodillas en los codos. Introducción a balances.",
    "progressions": [
      {
        "name": "Frog Stand",
        "req": "20-40 s",
        "current": true
      },
      {
        "name": "Crow Pose",
        "req": "15-30 s"
      },
      {
        "name": "Tuck Planche",
        "req": "10-20 s"
      }
    ],
    "equipment": [
      "suelo"
    ],
    "formTips": "Rodillas en los codos. Mirada adelante. Empuje de hombros.",
    "recommendedLevel": "principiante",
    "grips": null,
    "variations": null,
    "rangeCriteria": {
      "type": "hold",
      "basico": {
        "hold": 10
      },
      "intermedio": {
        "hold": 20
      },
      "avanzado": {
        "hold": 40
      },
      "elite": {
        "hold": 60
      }
    }
  },
  {
    "id": "crow-pose",
    "name": "Crow Pose",
    "technicalName": "Crow Pose",
    "category": "skills",
    "difficulty": 3.5,
    "type": "hold",
    "muscles": [
      "Hombros",
      "Core",
      "Muñecas"
    ],
    "description": "Balance sobre manos con rodillas cerca de las axilas.",
    "progressions": [
      {
        "name": "Frog Stand",
        "req": "30+ s"
      },
      {
        "name": "Crow Pose",
        "req": "15-30 s",
        "current": true
      }
    ],
    "equipment": [
      "suelo"
    ],
    "formTips": "Rodillas cerca de las axilas. Peso adelante. Core activo.",
    "recommendedLevel": "intermedio",
    "grips": null,
    "variations": null,
    "rangeCriteria": {
      "type": "hold",
      "basico": {
        "hold": 5
      },
      "intermedio": {
        "hold": 15
      },
      "avanzado": {
        "hold": 30
      },
      "elite": {
        "hold": 45
      }
    }
  },
  {
    "id": "german-hang",
    "name": "German Hang",
    "technicalName": "German hang (skin the cat hang)",
    "category": "skills",
    "difficulty": 3.5,
    "type": "hold",
    "muscles": [
      "Hombros (extensión)",
      "Pectoral",
      "Core"
    ],
    "description": "Colgado invertido tras pasar por skin the cat. Movilidad y fuerza de hombro en extensión.",
    "progressions": [
      {
        "name": "Skin the Cat",
        "req": "5+ reps"
      },
      {
        "name": "German Hang",
        "req": "10-30 s",
        "current": true
      },
      {
        "name": "Back Lever Tuck",
        "req": "15+ s"
      }
    ],
    "equipment": [
      "barra",
      "anillas"
    ],
    "formTips": "Rotación controlada desde skin the cat. No rebotes. Solo mantén si no hay dolor en el hombro.",
    "recommendedLevel": "intermedio",
    "grips": null,
    "variations": null,
    "rangeCriteria": {
      "type": "hold",
      "basico": {
        "hold": 5
      },
      "intermedio": {
        "hold": 15
      },
      "avanzado": {
        "hold": 30
      },
      "elite": {
        "hold": 45
      }
    }
  },
  {
    "id": "wall-handstand",
    "name": "Wall Handstand",
    "technicalName": "Parada de manos en pared",
    "category": "skills",
    "difficulty": 4,
    "type": "hold",
    "muscles": [
      "Deltoides",
      "Core",
      "Muñecas"
    ],
    "description": "Handstand con apoyo de pared para aprender alineación.",
    "progressions": [
      {
        "name": "Frog Stand",
        "req": "20+ s"
      },
      {
        "name": "Wall Handstand",
        "req": "30-60 s",
        "current": true
      },
      {
        "name": "Free Handstand",
        "req": "15-30 s"
      }
    ],
    "equipment": [
      "pared"
    ],
    "formTips": "Alineación vertical. No arquees la lumbar contra la pared.",
    "recommendedLevel": "intermedio",
    "grips": null,
    "variations": null,
    "rangeCriteria": {
      "type": "hold",
      "basico": {
        "hold": 15
      },
      "intermedio": {
        "hold": 30
      },
      "avanzado": {
        "hold": 60
      },
      "elite": {
        "hold": 90
      }
    }
  },
  {
    "id": "skin-the-cat",
    "name": "Skin the Cat",
    "technicalName": "Skin the Cat",
    "category": "skills",
    "difficulty": 4,
    "type": "reps",
    "muscles": [
      "Hombros",
      "Core",
      "Dorsales"
    ],
    "description": "Rotación completa a través de la barra.",
    "progressions": [
      {
        "name": "Skin the Cat",
        "req": "5-10 reps",
        "current": true
      },
      {
        "name": "Back Lever Tuck",
        "req": "15+ s"
      }
    ],
    "equipment": [
      "barra"
    ],
    "formTips": "Rotación controlada. No te dejes caer en el German hang de golpe.",
    "recommendedLevel": "intermedio",
    "grips": null,
    "variations": null,
    "rangeCriteria": null
  },
  {
    "id": "pseudo-planche-lean",
    "name": "Pseudo Planche Lean",
    "technicalName": "Pseudo Planche Lean",
    "category": "skills",
    "difficulty": 4.2,
    "type": "hold",
    "muscles": [
      "Deltoides anterior",
      "Core",
      "Muñecas"
    ],
    "description": "Inclinación hacia adelante con manos a la altura de la cadera. Base de planche.",
    "progressions": [
      {
        "name": "Pseudo Planche Lean",
        "req": "20-40 s",
        "current": true
      },
      {
        "name": "Tuck Planche",
        "req": "10-20 s"
      }
    ],
    "equipment": [
      "suelo"
    ],
    "formTips": "Manos a la altura de la cadera. Lean progresivo. Pies juntos.",
    "recommendedLevel": "intermedio",
    "grips": null,
    "variations": null,
    "rangeCriteria": {
      "type": "hold",
      "basico": {
        "hold": 10
      },
      "intermedio": {
        "hold": 20
      },
      "avanzado": {
        "hold": 40
      },
      "elite": {
        "hold": 60
      }
    }
  },
  {
    "id": "front-lever-tuck",
    "name": "Tuck Front Lever",
    "technicalName": "Tuck Front Lever",
    "category": "skills",
    "difficulty": 4.5,
    "type": "hold",
    "muscles": [
      "Dorsal ancho",
      "Core"
    ],
    "description": "Front lever con rodillas recogidas.",
    "progressions": [
      {
        "name": "Tuck Front Lever",
        "req": "15-30 s",
        "current": true
      },
      {
        "name": "Full Front Lever",
        "req": "5-15 s"
      }
    ],
    "equipment": [
      "barra"
    ],
    "formTips": "Hombros deprimidos. Rodillas recogidas. Cuerpo horizontal.",
    "recommendedLevel": "intermedio",
    "grips": null,
    "variations": null,
    "rangeCriteria": null
  },
  {
    "id": "elbow-lever",
    "name": "Elbow Lever",
    "technicalName": "Elbow Lever",
    "category": "skills",
    "difficulty": 4.5,
    "type": "hold",
    "muscles": [
      "Core",
      "Tríceps",
      "Hombros"
    ],
    "description": "Cuerpo horizontal apoyado sobre los codos.",
    "progressions": [
      {
        "name": "Frog Stand",
        "req": "20+ s"
      },
      {
        "name": "Elbow Lever",
        "req": "15-30 s",
        "current": true
      }
    ],
    "equipment": [
      "suelo",
      "paralelas"
    ],
    "formTips": "Codos en el abdomen. Cuerpo horizontal. Mirada al suelo.",
    "recommendedLevel": "intermedio",
    "grips": null,
    "variations": null,
    "rangeCriteria": {
      "type": "hold",
      "basico": {
        "hold": 5
      },
      "intermedio": {
        "hold": 15
      },
      "avanzado": {
        "hold": 30
      },
      "elite": {
        "hold": 45
      }
    }
  },
  {
    "id": "planche-lean",
    "name": "Planche Lean",
    "technicalName": "Planche Lean",
    "category": "skills",
    "difficulty": 4.5,
    "type": "hold",
    "muscles": [
      "Deltoides anterior",
      "Core",
      "Muñecas"
    ],
    "description": "Inclinación hacia adelante en posición de planche. Progresión clave hacia tuck planche.",
    "progressions": [
      {
        "name": "Pseudo Planche Lean",
        "req": "20-30 s"
      },
      {
        "name": "Planche Lean",
        "req": "20-40 s",
        "current": true
      },
      {
        "name": "Tuck Planche",
        "req": "10-20 s"
      }
    ],
    "equipment": [
      "suelo"
    ],
    "formTips": "Hombros por delante de las muñecas. Cuerpo rígido.",
    "recommendedLevel": "intermedio",
    "grips": null,
    "variations": null,
    "rangeCriteria": {
      "type": "hold",
      "basico": {
        "hold": 10
      },
      "intermedio": {
        "hold": 20
      },
      "avanzado": {
        "hold": 40
      },
      "elite": {
        "hold": 60
      }
    }
  },
  {
    "id": "wall-walk",
    "name": "Wall Walk",
    "technicalName": "Wall walk (hacia handstand)",
    "category": "skills",
    "difficulty": 4.8,
    "type": "reps",
    "muscles": [
      "Deltoides",
      "Core",
      "Tríceps"
    ],
    "description": "Desde plancha, camina pies por la pared hasta handstand. Progresión al pino.",
    "progressions": [
      {
        "name": "Pike Push-up",
        "req": "10+ reps"
      },
      {
        "name": "Wall Walk",
        "req": "3-6 reps",
        "current": true
      },
      {
        "name": "Wall Handstand",
        "req": "30-60 s"
      }
    ],
    "equipment": [
      "suelo",
      "pared"
    ],
    "formTips": "Pasos cortos con las manos. Core firme. Llega a la vertical sin arquear la lumbar.",
    "recommendedLevel": "intermedio",
    "grips": null,
    "variations": null,
    "rangeCriteria": {
      "type": "reps",
      "basico": {
        "total": 1,
        "strict": 0
      },
      "intermedio": {
        "total": 3,
        "strict": 2
      },
      "avanzado": {
        "total": 6,
        "strict": 5
      },
      "elite": {
        "total": 10,
        "strict": 8
      }
    }
  },
  {
    "id": "handstand",
    "name": "Handstand",
    "technicalName": "Handstand",
    "category": "skills",
    "difficulty": 6.5,
    "type": "hold",
    "muscles": [
      "Deltoides",
      "Trapecio",
      "Core",
      "Muñecas",
      "Tríceps"
    ],
    "description": "Equilibrio invertido sobre las manos. Base de muchas skills avanzadas.",
    "progressions": [
      {
        "name": "Push-up",
        "req": "15+ reps mínimas"
      },
      {
        "name": "Pike Push-up",
        "req": "10+ reps"
      },
      {
        "name": "Frog Stand",
        "req": "20-40 s"
      },
      {
        "name": "Frog Stand Advanced",
        "req": "30-60 s"
      },
      {
        "name": "Wall Tuck Handstand",
        "req": "20-40 s"
      },
      {
        "name": "Wall Handstand",
        "req": "30-60 s"
      },
      {
        "name": "Tuck Handstand (libre)",
        "req": "15-30 s"
      },
      {
        "name": "Straddle Handstand (libre)",
        "req": "15-30 s"
      },
      {
        "name": "Handstand (libre)",
        "req": "30+ s",
        "current": true
      },
      {
        "name": "Handstand Push-up",
        "req": "3-8 reps"
      },
      {
        "name": "Press to Handstand",
        "req": "3-6 reps"
      }
    ],
    "equipment": [
      "suelo",
      "pared"
    ],
    "formTips": "Empuja el suelo. Mira entre las manos. Costillas adentro. Glúteos firmes.",
    "recommendedLevel": "avanzado",
    "grips": null,
    "variations": null,
    "rangeCriteria": {
      "type": "hold",
      "basico": {
        "hold": 5
      },
      "intermedio": {
        "hold": 20
      },
      "avanzado": {
        "hold": 45
      },
      "elite": {
        "hold": 90
      }
    }
  },
  {
    "id": "tuck-planche",
    "name": "Tuck Planche",
    "technicalName": "Tuck Planche",
    "category": "skills",
    "difficulty": 6.5,
    "type": "hold",
    "muscles": [
      "Deltoides anterior",
      "Core",
      "Tríceps"
    ],
    "description": "Planche con rodillas recogidas.",
    "progressions": [
      {
        "name": "Planche Lean",
        "req": "30+ s"
      },
      {
        "name": "Tuck Planche",
        "req": "15-30 s",
        "current": true
      },
      {
        "name": "Full Planche",
        "req": "5-12 s"
      }
    ],
    "equipment": [
      "suelo",
      "paralelas"
    ],
    "formTips": "Rodillas al pecho. Protrusión escapular. Codos bloqueados.",
    "recommendedLevel": "avanzado",
    "grips": null,
    "variations": null,
    "rangeCriteria": {
      "type": "hold",
      "basico": {
        "hold": 5
      },
      "intermedio": {
        "hold": 15
      },
      "avanzado": {
        "hold": 25
      },
      "elite": {
        "hold": 40
      }
    }
  },
  {
    "id": "back-lever",
    "name": "Back Lever",
    "technicalName": "Back Lever",
    "category": "skills",
    "difficulty": 7,
    "type": "hold",
    "muscles": [
      "Hombros (extensión)",
      "Core",
      "Dorsales",
      "Pectoral"
    ],
    "description": "Cuerpo horizontal colgado, cara hacia el suelo. Requiere movilidad de hombro.",
    "progressions": [
      {
        "name": "Skin the Cat",
        "req": "5-10 reps"
      },
      {
        "name": "Tuck Back Lever",
        "req": "15-30 s"
      },
      {
        "name": "Advanced Tuck Back Lever",
        "req": "10-20 s"
      },
      {
        "name": "Straddle Back Lever",
        "req": "8-15 s"
      },
      {
        "name": "Full Back Lever",
        "req": "8-20 s",
        "current": true
      }
    ],
    "equipment": [
      "barra"
    ],
    "formTips": "Hombros en extensión cómoda. Cuerpo rígido. No fuerces si hay pinchazo.",
    "recommendedLevel": "avanzado",
    "grips": [
      "Prono",
      "False grip"
    ],
    "variations": [
      "Prone grip",
      "False grip"
    ],
    "rangeCriteria": {
      "type": "hold",
      "basico": {
        "hold": 5
      },
      "intermedio": {
        "hold": 12
      },
      "avanzado": {
        "hold": 20
      },
      "elite": {
        "hold": 40
      }
    }
  },
  {
    "id": "free-handstand",
    "name": "Handstand (Free)",
    "technicalName": "Handstand (Free Hold)",
    "category": "skills",
    "difficulty": 7,
    "type": "hold",
    "muscles": [
      "Deltoids",
      "Core",
      "Wrists",
      "Traps"
    ],
    "description": "Freestanding handstand hold without wall support. Balance, alignment and shoulder endurance.",
    "progressions": [
      {
        "name": "Wall Handstand",
        "req": "45-60 s"
      },
      {
        "name": "Wall Walk",
        "req": "3-6 reps"
      },
      {
        "name": "Handstand (Free)",
        "req": "15-45 s",
        "current": true
      },
      {
        "name": "One-arm Handstand",
        "req": "5-15 s"
      }
    ],
    "equipment": [
      "suelo"
    ],
    "formTips": "Push the floor away. Look between the hands. Ribs in, glutes tight. Small finger corrections, not large hip swings.",
    "recommendedLevel": "avanzado",
    "grips": null,
    "variations": null,
    "rangeCriteria": {
      "type": "hold",
      "basico": {
        "hold": 5
      },
      "intermedio": {
        "hold": 15
      },
      "avanzado": {
        "hold": 30
      },
      "elite": {
        "hold": 60
      }
    }
  },
  {
    "id": "advanced-tuck-planche",
    "name": "Advanced Tuck Planche",
    "technicalName": "Advanced Tuck Planche",
    "category": "skills",
    "difficulty": 7.2,
    "type": "hold",
    "muscles": [
      "Deltoides anterior",
      "Core",
      "Tríceps"
    ],
    "description": "Tuck planche con cadera más abierta y rodillas más atrás. Puente a straddle.",
    "progressions": [
      {
        "name": "Tuck Planche",
        "req": "20+ s"
      },
      {
        "name": "Advanced Tuck Planche",
        "req": "10-20 s",
        "current": true
      },
      {
        "name": "Straddle Planche",
        "req": "8-15 s"
      }
    ],
    "equipment": [
      "suelo",
      "paralelas"
    ],
    "formTips": "Cadera más abierta que en tuck. Rodillas atrás. Protrusión escapular y lean fuerte.",
    "recommendedLevel": "avanzado",
    "grips": null,
    "variations": null,
    "rangeCriteria": {
      "type": "hold",
      "basico": {
        "hold": 3
      },
      "intermedio": {
        "hold": 10
      },
      "avanzado": {
        "hold": 20
      },
      "elite": {
        "hold": 35
      }
    }
  },
  {
    "id": "muscle-up",
    "name": "Muscle-up",
    "technicalName": "Muscle-up",
    "category": "skills",
    "difficulty": 7.5,
    "type": "reps",
    "muscles": [
      "Dorsal ancho",
      "Pectoral",
      "Tríceps",
      "Deltoides",
      "Core"
    ],
    "description": "Transición explosiva de dominada a fondo por encima de la barra. Skill icónica.",
    "progressions": [
      {
        "name": "Pull-up",
        "req": "10+ reps estrictas"
      },
      {
        "name": "Chest-to-bar Pull-up",
        "req": "6+ reps"
      },
      {
        "name": "Explosive Pull-up",
        "req": "5-8 reps"
      },
      {
        "name": "False Grip Hang",
        "req": "20-40 s"
      },
      {
        "name": "Transition drills",
        "req": "práctica"
      },
      {
        "name": "Band-assisted Muscle-up",
        "req": "3-6 reps"
      },
      {
        "name": "Muscle-up (kipping)",
        "req": "3-8 reps"
      },
      {
        "name": "Strict Muscle-up",
        "req": "3-8 reps",
        "current": true
      },
      {
        "name": "Slow Muscle-up",
        "req": "2-5 reps"
      },
      {
        "name": "Weighted Muscle-up",
        "req": "2-5 reps"
      }
    ],
    "equipment": [
      "barra"
    ],
    "formTips": "Tirón explosivo + transición rápida. Entrena false grip y dips por separado.",
    "recommendedLevel": "avanzado",
    "grips": [
      "Prono",
      "Supino",
      "False grip",
      "Mixed grip"
    ],
    "variations": [
      "Slow",
      "Switching",
      "Clap",
      "Supinated grip",
      "L-up",
      "False grip",
      "Supinated grip + clap",
      "False grip + clap",
      "False grip + slow",
      "Mixed grip (prone/supinated)",
      "Mixed grip + clap"
    ],
    "rangeCriteria": {
      "type": "reps",
      "basico": {
        "total": 1,
        "strict": 0
      },
      "intermedio": {
        "total": 3,
        "strict": 1
      },
      "avanzado": {
        "total": 8,
        "strict": 5
      },
      "elite": {
        "total": 15,
        "strict": 10
      }
    }
  },
  {
    "id": "handstand-walk",
    "name": "Handstand Walk",
    "technicalName": "Caminata en parada de manos",
    "category": "skills",
    "difficulty": 7.5,
    "type": "reps",
    "muscles": [
      "Deltoides",
      "Core",
      "Muñecas"
    ],
    "description": "Desplazamiento en handstand.",
    "progressions": [
      {
        "name": "Free Handstand",
        "req": "20+ s"
      },
      {
        "name": "Handstand Walk",
        "req": "5-15 pasos",
        "current": true
      }
    ],
    "equipment": [
      "suelo",
      "pared"
    ],
    "formTips": "Pasos pequeños. Hombros activos. No dejes caer la cadera.",
    "recommendedLevel": "avanzado",
    "grips": null,
    "variations": null,
    "rangeCriteria": null
  },
  {
    "id": "front-lever-raise",
    "name": "Front Lever Raise",
    "technicalName": "Front Lever Raise",
    "category": "skills",
    "difficulty": 8,
    "type": "reps",
    "muscles": [
      "Dorsal ancho",
      "Core",
      "Hombros"
    ],
    "description": "Elevación desde colgado hasta posición de front lever.",
    "progressions": [
      {
        "name": "Tuck Front Lever Raise",
        "req": "5-8 reps"
      },
      {
        "name": "Front Lever Raise",
        "req": "3-6 reps",
        "current": true
      }
    ],
    "equipment": [
      "barra"
    ],
    "formTips": "Brazos rectos. Inicia con depresión escapular. Sube hasta horizontal.",
    "recommendedLevel": "avanzado",
    "grips": [
      "Prono",
      "Supino"
    ],
    "variations": null,
    "rangeCriteria": {
      "type": "reps",
      "basico": {
        "total": 1,
        "strict": 0
      },
      "intermedio": {
        "total": 3,
        "strict": 2
      },
      "avanzado": {
        "total": 6,
        "strict": 4
      },
      "elite": {
        "total": 10,
        "strict": 8
      }
    }
  },
  {
    "id": "press-to-handstand",
    "name": "Press to Handstand",
    "technicalName": "Press to Handstand",
    "category": "skills",
    "difficulty": 8.2,
    "type": "reps",
    "muscles": [
      "Deltoides",
      "Core",
      "Flexores",
      "Tríceps"
    ],
    "description": "Subida a handstand por fuerza sin impulso.",
    "progressions": [
      {
        "name": "Wall Press",
        "req": "3-5 reps"
      },
      {
        "name": "Press to Handstand",
        "req": "3-6 reps",
        "current": true
      }
    ],
    "equipment": [
      "suelo",
      "pared"
    ],
    "formTips": "Compresión fuerte. Subida lenta sin salto.",
    "recommendedLevel": "avanzado",
    "grips": null,
    "variations": null,
    "rangeCriteria": null
  },
  {
    "id": "front-lever",
    "name": "Front Lever",
    "technicalName": "Front Lever",
    "category": "skills",
    "difficulty": 8.5,
    "type": "hold",
    "muscles": [
      "Dorsal ancho",
      "Core",
      "Hombros",
      "Bíceps"
    ],
    "description": "Cuerpo completamente horizontal colgado de la barra, cara hacia arriba.",
    "progressions": [
      {
        "name": "Tuck Front Lever",
        "req": "15-30 s"
      },
      {
        "name": "Advanced Tuck Front Lever",
        "req": "10-20 s"
      },
      {
        "name": "One-leg Front Lever",
        "req": "8-15 s"
      },
      {
        "name": "Straddle Front Lever",
        "req": "8-15 s"
      },
      {
        "name": "Half-lay Front Lever",
        "req": "5-12 s"
      },
      {
        "name": "Full Front Lever",
        "req": "5-15 s",
        "current": true
      },
      {
        "name": "Front Lever Pulls",
        "req": "3-8 reps"
      }
    ],
    "equipment": [
      "barra"
    ],
    "formTips": "Cuerpo recto como una tabla. Hombros empaquetados. No dejes caer la cadera.",
    "recommendedLevel": "avanzado",
    "grips": [
      "Supinado",
      "Neutro",
      "False grip",
      "Prono (plane)"
    ],
    "variations": [
      "Supinated grip",
      "Neutral grip",
      "False grip",
      "Plane grip"
    ],
    "rangeCriteria": {
      "type": "hold",
      "basico": {
        "hold": 3
      },
      "intermedio": {
        "hold": 8
      },
      "avanzado": {
        "hold": 15
      },
      "elite": {
        "hold": 30
      }
    }
  },
  {
    "id": "straddle-planche",
    "name": "Straddle Planche",
    "technicalName": "Straddle Planche",
    "category": "skills",
    "difficulty": 8.5,
    "type": "hold",
    "muscles": [
      "Deltoides anterior",
      "Core",
      "Tríceps"
    ],
    "description": "Planche con piernas abiertas. Reduce la palanca respecto a full planche.",
    "progressions": [
      {
        "name": "Advanced Tuck Planche",
        "req": "15+ s"
      },
      {
        "name": "Straddle Planche",
        "req": "8-15 s",
        "current": true
      },
      {
        "name": "Full Planche",
        "req": "5-12 s"
      }
    ],
    "equipment": [
      "suelo",
      "paralelas"
    ],
    "formTips": "Piernas abiertas y rectas. Cuerpo horizontal. Empuje activo de hombros. No dejes caer la cadera.",
    "recommendedLevel": "avanzado",
    "grips": null,
    "variations": null,
    "rangeCriteria": {
      "type": "hold",
      "basico": {
        "hold": 2
      },
      "intermedio": {
        "hold": 5
      },
      "avanzado": {
        "hold": 10
      },
      "elite": {
        "hold": 20
      }
    }
  },
  {
    "id": "human-flag",
    "name": "Human Flag",
    "technicalName": "Bandera humana (Human Flag)",
    "category": "skills",
    "difficulty": 9,
    "type": "hold",
    "muscles": [
      "Oblicuos",
      "Hombros",
      "Core lateral",
      "Dorsales"
    ],
    "description": "Cuerpo horizontal en un poste vertical. Una de las skills más espectaculares.",
    "progressions": [
      {
        "name": "Side Plank",
        "req": "40-60 s"
      },
      {
        "name": "Vertical Flag (asistido)",
        "req": "10-20 s"
      },
      {
        "name": "Tuck Flag",
        "req": "8-15 s"
      },
      {
        "name": "Straddle Flag",
        "req": "5-12 s"
      },
      {
        "name": "Full Human Flag",
        "req": "5-15 s",
        "current": true
      }
    ],
    "equipment": [
      "poste"
    ],
    "formTips": "Empuje del brazo de abajo + tirón del de arriba. Cadera alineada.",
    "recommendedLevel": "avanzado",
    "grips": [
      "Prono",
      "Supino",
      "Neutro"
    ],
    "variations": [
      "Prone grip",
      "Supinated grip",
      "Neutral grip"
    ],
    "rangeCriteria": {
      "type": "hold",
      "basico": {
        "hold": 2
      },
      "intermedio": {
        "hold": 6
      },
      "avanzado": {
        "hold": 12
      },
      "elite": {
        "hold": 25
      }
    }
  },
  {
    "id": "planche-push-up",
    "name": "Planche Push-up",
    "technicalName": "Planche Push-up",
    "category": "skills",
    "difficulty": 9.2,
    "type": "reps",
    "muscles": [
      "Deltoides anterior",
      "Core",
      "Tríceps",
      "Pectoral"
    ],
    "description": "Flexión manteniendo el cuerpo en planche. Skill de élite.",
    "progressions": [
      {
        "name": "Pseudo Planche Push-up",
        "req": "12+ reps"
      },
      {
        "name": "Tuck Planche Push-up",
        "req": "5-10 reps"
      },
      {
        "name": "Planche Push-up",
        "req": "3-8 reps",
        "current": true
      }
    ],
    "equipment": [
      "suelo",
      "paralelas"
    ],
    "formTips": "Mantén la línea de planche al flexionar. Rango controlado.",
    "recommendedLevel": "avanzado",
    "grips": null,
    "variations": null,
    "rangeCriteria": null
  },
  {
    "id": "planche",
    "name": "Planche",
    "technicalName": "Planche",
    "category": "skills",
    "difficulty": 9.5,
    "type": "hold",
    "muscles": [
      "Deltoides anterior",
      "Core",
      "Tríceps",
      "Muñecas"
    ],
    "description": "Cuerpo horizontal en el aire solo con las manos. Skill de élite.",
    "progressions": [
      {
        "name": "Planche Lean",
        "req": "20-40 s"
      },
      {
        "name": "Tuck Planche",
        "req": "15-30 s"
      },
      {
        "name": "Advanced Tuck Planche",
        "req": "10-20 s"
      },
      {
        "name": "Straddle Planche",
        "req": "8-15 s"
      },
      {
        "name": "Full Planche",
        "req": "5-12 s",
        "current": true
      }
    ],
    "equipment": [
      "suelo",
      "paralelas"
    ],
    "formTips": "Cuerpo horizontal. Escápulas protruidas. No dejes caer la cadera.",
    "recommendedLevel": "avanzado",
    "grips": null,
    "variations": null,
    "rangeCriteria": {
      "type": "hold",
      "basico": {
        "hold": 2
      },
      "intermedio": {
        "hold": 5
      },
      "avanzado": {
        "hold": 10
      },
      "elite": {
        "hold": 20
      }
    }
  },
  {
    "id": "one-arm-handstand",
    "name": "One-arm Handstand",
    "technicalName": "Parada de manos a una mano",
    "category": "skills",
    "difficulty": 9.5,
    "type": "hold",
    "muscles": [
      "Deltoides",
      "Core",
      "Muñecas",
      "Oblicuos"
    ],
    "description": "Handstand unilateral. Equilibrio y fuerza de élite.",
    "progressions": [
      {
        "name": "Free Handstand",
        "req": "45+ s"
      },
      {
        "name": "Handstand Shoulder Taps",
        "req": "10 por lado"
      },
      {
        "name": "One-arm Handstand (asistido)",
        "req": "5-10 s"
      },
      {
        "name": "One-arm Handstand",
        "req": "5-15 s",
        "current": true
      }
    ],
    "equipment": [
      "suelo",
      "pared"
    ],
    "formTips": "Peso centrado sobre la mano de apoyo. Hombro activo. Usa la pared al inicio. No gires la cadera.",
    "recommendedLevel": "avanzado",
    "grips": null,
    "variations": null,
    "rangeCriteria": {
      "type": "hold",
      "basico": {
        "hold": 1
      },
      "intermedio": {
        "hold": 3
      },
      "avanzado": {
        "hold": 8
      },
      "elite": {
        "hold": 15
      }
    }
  },
  {
    "id": "manna",
    "name": "Manna",
    "technicalName": "Manna",
    "category": "skills",
    "difficulty": 9.6,
    "type": "hold",
    "muscles": [
      "Hombros (flexión)",
      "Core",
      "Tríceps",
      "Muñecas"
    ],
    "description": "Posición invertida de L-sit con cadera por encima de los hombros. Skill gimnástica de élite.",
    "progressions": [
      {
        "name": "L-Sit",
        "req": "20+ s"
      },
      {
        "name": "V-Sit",
        "req": "15+ s"
      },
      {
        "name": "Manna (parcial)",
        "req": "3-8 s"
      },
      {
        "name": "Manna",
        "req": "5-15 s",
        "current": true
      }
    ],
    "equipment": [
      "suelo",
      "paralelas"
    ],
    "formTips": "Compresión máxima. Cadera por encima de los hombros. Empuje fuerte en extensión de hombro. Progresión lenta.",
    "recommendedLevel": "avanzado",
    "grips": null,
    "variations": null,
    "rangeCriteria": {
      "type": "hold",
      "basico": {
        "hold": 1
      },
      "intermedio": {
        "hold": 3
      },
      "avanzado": {
        "hold": 8
      },
      "elite": {
        "hold": 15
      }
    }
  },
  {
    "id": "iron-cross",
    "name": "Iron Cross",
    "technicalName": "Cruz de hierro (Iron Cross)",
    "category": "skills",
    "difficulty": 9.7,
    "type": "hold",
    "muscles": [
      "Pectoral",
      "Dorsales",
      "Hombros",
      "Core"
    ],
    "description": "Brazos en cruz sobre anillas con cuerpo vertical. Skill icónica de anillas.",
    "progressions": [
      {
        "name": "Ring Support Hold",
        "req": "30+ s"
      },
      {
        "name": "Iron Cross (asistido)",
        "req": "3-8 s"
      },
      {
        "name": "Iron Cross",
        "req": "3-10 s",
        "current": true
      }
    ],
    "equipment": [
      "anillas"
    ],
    "formTips": "Anillas a la altura de los hombros. Brazos rectos. No dejes que el cuerpo se balancee. Asistencia con bandas recomendada.",
    "recommendedLevel": "avanzado",
    "grips": null,
    "variations": null,
    "rangeCriteria": {
      "type": "hold",
      "basico": {
        "hold": 1
      },
      "intermedio": {
        "hold": 3
      },
      "avanzado": {
        "hold": 6
      },
      "elite": {
        "hold": 12
      }
    }
  },
  {
    "id": "one-arm-front-lever",
    "name": "One-arm Front Lever",
    "technicalName": "Front lever a una mano",
    "category": "skills",
    "difficulty": 9.8,
    "type": "hold",
    "muscles": [
      "Dorsal ancho",
      "Core",
      "Bíceps",
      "Agarre"
    ],
    "description": "Front lever unilateral. Una de las skills de fuerza relativa más exigentes.",
    "progressions": [
      {
        "name": "Full Front Lever",
        "req": "15+ s"
      },
      {
        "name": "One-arm Front Lever (asistido)",
        "req": "3-8 s"
      },
      {
        "name": "One-arm Front Lever",
        "req": "3-10 s",
        "current": true
      }
    ],
    "equipment": [
      "barra"
    ],
    "formTips": "Hombro empaquetado del brazo de apoyo. Cuerpo rígido. Empieza con asistencia o banda.",
    "recommendedLevel": "avanzado",
    "grips": [
      "Prono",
      "Supino"
    ],
    "variations": null,
    "rangeCriteria": {
      "type": "hold",
      "basico": {
        "hold": 1
      },
      "intermedio": {
        "hold": 3
      },
      "avanzado": {
        "hold": 6
      },
      "elite": {
        "hold": 12
      }
    }
  },
  {
    "id": "victorian",
    "name": "Victorian",
    "technicalName": "Victorian lever",
    "category": "skills",
    "difficulty": 9.8,
    "type": "hold",
    "muscles": [
      "Pectoral",
      "Deltoides",
      "Core",
      "Tríceps"
    ],
    "description": "Soporte horizontal con brazos abiertos (paralelas o anillas). Skill de fuerza de élite, distinta del Maltese.",
    "progressions": [
      {
        "name": "Planche",
        "req": "10+ s"
      },
      {
        "name": "Victorian (asistido)",
        "req": "2-5 s"
      },
      {
        "name": "Victorian",
        "req": "3-8 s",
        "current": true
      }
    ],
    "equipment": [
      "paralelas",
      "anillas"
    ],
    "formTips": "Cuerpo horizontal en soporte con brazos abiertos. Muy exigente para hombros y pectoral. Progresa con bandas.",
    "recommendedLevel": "avanzado",
    "grips": null,
    "variations": null,
    "rangeCriteria": {
      "type": "hold",
      "basico": {
        "hold": 1
      },
      "intermedio": {
        "hold": 2
      },
      "avanzado": {
        "hold": 5
      },
      "elite": {
        "hold": 10
      }
    }
  },
  {
    "id": "maltese",
    "name": "Maltese",
    "technicalName": "Maltese",
    "category": "skills",
    "difficulty": 9.9,
    "type": "hold",
    "muscles": [
      "Pectoral",
      "Deltoides",
      "Core",
      "Tríceps"
    ],
    "description": "Planche con brazos abiertos sobre anillas o paralelas. Una de las skills de empuje más exigentes del mundo.",
    "progressions": [
      {
        "name": "Planche",
        "req": "10+ s"
      },
      {
        "name": "Maltese (asistido)",
        "req": "2-5 s"
      },
      {
        "name": "Maltese",
        "req": "3-8 s",
        "current": true
      }
    ],
    "equipment": [
      "anillas",
      "paralelas"
    ],
    "formTips": "Planche con brazos abiertos en anillas. Lean extremo y protrusión. Solo con base sólida de planche.",
    "recommendedLevel": "avanzado",
    "grips": null,
    "variations": null,
    "rangeCriteria": {
      "type": "hold",
      "basico": {
        "hold": 1
      },
      "intermedio": {
        "hold": 2
      },
      "avanzado": {
        "hold": 5
      },
      "elite": {
        "hold": 10
      }
    }
  },
  {
    "id": "jumping-jack",
    "name": "Jumping Jack",
    "technicalName": "Jumping Jack",
    "category": "conditioning",
    "difficulty": 1.2,
    "type": "reps",
    "muscles": [
      "Full body",
      "Cardio"
    ],
    "description": "Salto abriendo y cerrando piernas y brazos.",
    "progressions": [
      {
        "name": "Jumping Jack",
        "req": "30-50 reps",
        "current": true
      }
    ],
    "equipment": [
      "suelo"
    ],
    "formTips": "Aterriza con control. Brazos y piernas sincronizados.",
    "recommendedLevel": "principiante",
    "grips": null,
    "variations": null,
    "rangeCriteria": null
  },
  {
    "id": "high-knees",
    "name": "High Knees",
    "technicalName": "Rodillas altas",
    "category": "conditioning",
    "difficulty": 2,
    "type": "reps",
    "muscles": [
      "Flexores de cadera",
      "Core",
      "Cardio"
    ],
    "description": "Carrera en el sitio elevando rodillas.",
    "progressions": [
      {
        "name": "High Knees",
        "req": "30-60 s",
        "current": true
      }
    ],
    "equipment": [
      "suelo"
    ],
    "formTips": "Rodillas altas. Postura erguida. Cadencia rápida pero controlada.",
    "recommendedLevel": "principiante",
    "grips": null,
    "variations": null,
    "rangeCriteria": null
  },
  {
    "id": "squat-thrust",
    "name": "Squat Thrust",
    "technicalName": "Squat Thrust",
    "category": "conditioning",
    "difficulty": 2.5,
    "type": "reps",
    "muscles": [
      "Full body"
    ],
    "description": "De pie a plancha y vuelta. Base del burpee.",
    "progressions": [
      {
        "name": "Squat Thrust",
        "req": "10-20 reps",
        "current": true
      },
      {
        "name": "Burpee",
        "req": "10-15 reps"
      }
    ],
    "equipment": [
      "suelo"
    ],
    "formTips": "Transición limpia a plancha. Sin arquear la lumbar.",
    "recommendedLevel": "principiante",
    "grips": null,
    "variations": null,
    "rangeCriteria": null
  },
  {
    "id": "mountain-climber",
    "name": "Mountain Climber",
    "technicalName": "Mountain Climber",
    "category": "conditioning",
    "difficulty": 2.5,
    "type": "reps",
    "muscles": [
      "Core",
      "Hombros",
      "Flexores de cadera"
    ],
    "description": "Plancha con rodillas al pecho de forma alterna.",
    "progressions": [
      {
        "name": "Mountain Climber",
        "req": "20-40 por lado",
        "current": true
      }
    ],
    "equipment": [
      "suelo"
    ],
    "formTips": "Cadera estable. Rodillas al pecho sin rebotar.",
    "recommendedLevel": "principiante",
    "grips": null,
    "variations": null,
    "rangeCriteria": null
  },
  {
    "id": "crab-walk",
    "name": "Crab Walk",
    "technicalName": "Crab Walk",
    "category": "conditioning",
    "difficulty": 2.8,
    "type": "reps",
    "muscles": [
      "Tríceps",
      "Hombros",
      "Glúteos",
      "Core"
    ],
    "description": "Desplazamiento sentado con apoyo de manos y pies.",
    "progressions": [
      {
        "name": "Crab Walk",
        "req": "10-20 m",
        "current": true
      }
    ],
    "equipment": [
      "suelo"
    ],
    "formTips": "Cadera elevada. Manos bajo los hombros. No dejes caer el trasero.",
    "recommendedLevel": "principiante",
    "grips": null,
    "variations": null,
    "rangeCriteria": null
  },
  {
    "id": "bear-crawl",
    "name": "Bear Crawl",
    "technicalName": "Bear Crawl",
    "category": "conditioning",
    "difficulty": 3,
    "type": "reps",
    "muscles": [
      "Hombros",
      "Core",
      "Piernas"
    ],
    "description": "Desplazamiento a cuatro patas con rodillas elevadas.",
    "progressions": [
      {
        "name": "Bear Crawl",
        "req": "10-20 m",
        "current": true
      }
    ],
    "equipment": [
      "suelo"
    ],
    "formTips": "Rodillas elevadas. Pasos cortos. Core firme.",
    "recommendedLevel": "intermedio",
    "grips": null,
    "variations": null,
    "rangeCriteria": null
  },
  {
    "id": "box-jump",
    "name": "Box Jump",
    "technicalName": "Box Jump",
    "category": "conditioning",
    "difficulty": 3.5,
    "type": "reps",
    "muscles": [
      "Cuádriceps",
      "Glúteos",
      "Gemelos"
    ],
    "description": "Salto explosivo a superficie elevada.",
    "progressions": [
      {
        "name": "Jump Squat",
        "req": "10+ reps"
      },
      {
        "name": "Box Jump",
        "req": "8-15 reps",
        "current": true
      }
    ],
    "equipment": [
      "banco"
    ],
    "formTips": "Aterriza completo sobre el cajón. Baja con control o baja un paso.",
    "recommendedLevel": "intermedio",
    "grips": null,
    "variations": null,
    "rangeCriteria": null
  },
  {
    "id": "burpee",
    "name": "Burpee",
    "technicalName": "Burpee",
    "category": "conditioning",
    "difficulty": 3.5,
    "type": "reps",
    "muscles": [
      "Full body"
    ],
    "description": "Sentadilla + flexión + salto. Condicionamiento completo.",
    "progressions": [
      {
        "name": "Squat Thrust",
        "req": "10-15 reps"
      },
      {
        "name": "Burpee",
        "req": "10-20 reps",
        "current": true
      }
    ],
    "equipment": [
      "suelo"
    ],
    "formTips": "Ritmo constante. Pecho cerca del suelo en la flexión. Aterrizaje suave.",
    "recommendedLevel": "intermedio",
    "grips": null,
    "variations": null,
    "rangeCriteria": {
      "type": "reps",
      "basico": {
        "total": 8,
        "strict": 5
      },
      "intermedio": {
        "total": 15,
        "strict": 12
      },
      "avanzado": {
        "total": 25,
        "strict": 20
      },
      "elite": {
        "total": 40,
        "strict": 30
      }
    }
  }
];

const LEVELS = [
  {
    "id": "principiante",
    "name": "Principiante",
    "desc": "Estás empezando o aún no dominas las bases (push-ups, pull-ups, sentadillas completas). Enfocado en construir fuerza general y técnica."
  },
  {
    "id": "intermedio",
    "name": "Intermedio",
    "desc": "Puedes hacer 10+ push-ups, 5+ pull-ups y trabajas progresiones de skills (tuck lever, wall handstand, etc.)."
  },
  {
    "id": "avanzado",
    "name": "Avanzado",
    "desc": "Dominas muscle-ups, front/back lever en progresiones altas, handstand libre y buscas skills de élite o volumen alto."
  }
];

const GOALS = [
  {
    "id": "fuerza",
    "name": "Fuerza máxima",
    "desc": "Aumentar fuerza relativa: más reps en básicos y progresar hacia skills difíciles (planche, front lever, one-arm)."
  },
  {
    "id": "skills",
    "name": "Dominar Skills",
    "desc": "Enfocarte en trucos avanzados: muscle-up, handstand, levers, planche, human flag y sus variaciones."
  },
  {
    "id": "hipertrofia",
    "name": "Hipertrofia / Estética",
    "desc": "Ganar masa muscular visible con volumen alto de push, pull y piernas, manteniendo buena composición corporal."
  },
  {
    "id": "resistencia",
    "name": "Resistencia y conditioning",
    "desc": "Mejorar capacidad de trabajo: circuitos, alta repetición, densidades y endurance en skills."
  },
  {
    "id": "movilidad",
    "name": "Movilidad y control",
    "desc": "Mejorar rangos de movimiento, estabilidad de hombros/muñecas y control corporal general."
  },
  {
    "id": "salud",
    "name": "Salud y consistencia",
    "desc": "Entrenar de forma sostenible, mejorar postura, prevenir lesiones y mantener el hábito a largo plazo."
  }
];

const PRESET_ROUTINES = [
  {
    "id": "full-beginner",
    "name": "Full Body Principiante",
    "description": "Rutina completa para empezar en calistenia. Empuje, tirón, piernas y core.",
    "exercises": [
      "push-up",
      "australian-row",
      "squat",
      "plank",
      "glute-bridge"
    ]
  },
  {
    "id": "push-pull",
    "name": "Push + Pull",
    "description": "Énfasis en empuje y tirón superior. Ideal 3-4 días/semana.",
    "exercises": [
      "push-up",
      "dip",
      "pull-up",
      "australian-row",
      "pike-push-up"
    ]
  },
  {
    "id": "skills-focus",
    "name": "Skills Focus",
    "description": "Trabajo de habilidades: handstand, L-sit y progresiones de lever.",
    "exercises": [
      "handstand",
      "l-sit",
      "front-lever-tuck",
      "pseudo-planche-lean",
      "hollow-body"
    ]
  },
  {
    "id": "core-legs",
    "name": "Core + Piernas",
    "description": "Fuerza de piernas y core profundo. Pistol, nordic y anti-extensión.",
    "exercises": [
      "pistol-squat",
      "nordic-curl",
      "hanging-leg-raise",
      "hollow-body",
      "single-leg-rdl"
    ]
  },
  {
    "id": "shoulder-health",
    "name": "Hombro saludable",
    "description": "Movilidad y estabilidad escapular. Previene lesiones y mejora el control.",
    "exercises": [
      "scapular-pull-up",
      "face-pull-band",
      "y-raise",
      "dead-hang",
      "wall-walk"
    ]
  },
  {
    "id": "posterior-chain",
    "name": "Cadena posterior",
    "description": "Isquios, glúteos y espalda baja. Ideal para equilibrar el empuje dominante.",
    "exercises": [
      "nordic-curl",
      "good-morning-bw",
      "single-leg-rdl",
      "glute-bridge",
      "arch-hold"
    ]
  },
  {
    "id": "skills-intermediate",
    "name": "Skills intermedias",
    "description": "Puente entre básico y avanzado: planche lean, tuck levers y handstand work.",
    "exercises": [
      "planche-lean",
      "tuck-planche",
      "front-lever-tuck",
      "wall-handstand",
      "elbow-lever"
    ]
  }
];

const REFERENCE_AVERAGES = {
  "muscle-up": {
    "intermedio": 3,
    "avanzado": 8,
    "elite": 15
  },
  "front-lever": {
    "intermedio": 8,
    "avanzado": 15,
    "elite": 30
  },
  "back-lever": {
    "intermedio": 10,
    "avanzado": 20,
    "elite": 40
  },
  "human-flag": {
    "intermedio": 5,
    "avanzado": 12,
    "elite": 25
  },
  "handstand": {
    "intermedio": 20,
    "avanzado": 45,
    "elite": 90
  },
  "one-arm-handstand": {
    "intermedio": 3,
    "avanzado": 8,
    "elite": 15
  },
  "pull-up": {
    "intermedio": 8,
    "avanzado": 15,
    "elite": 25
  },
  "chin-up": {
    "intermedio": 8,
    "avanzado": 15,
    "elite": 25
  },
  "push-up": {
    "intermedio": 20,
    "avanzado": 40,
    "elite": 60
  },
  "dip": {
    "intermedio": 8,
    "avanzado": 15,
    "elite": 25
  },
  "pike-push-up": {
    "intermedio": 10,
    "avanzado": 20,
    "elite": 30
  },
  "hspu": {
    "intermedio": 3,
    "avanzado": 8,
    "elite": 15
  },
  "l-sit": {
    "intermedio": 15,
    "avanzado": 30,
    "elite": 60
  },
  "v-sit": {
    "intermedio": 10,
    "avanzado": 20,
    "elite": 40
  },
  "pistol-squat": {
    "intermedio": 3,
    "avanzado": 8,
    "elite": 15
  },
  "planche": {
    "intermedio": 5,
    "avanzado": 10,
    "elite": 20
  },
  "tuck-planche": {
    "intermedio": 10,
    "avanzado": 20,
    "elite": 40
  },
  "straddle-planche": {
    "intermedio": 5,
    "avanzado": 10,
    "elite": 20
  },
  "hollow-body": {
    "intermedio": 30,
    "avanzado": 60,
    "elite": 90
  },
  "plank": {
    "intermedio": 45,
    "avanzado": 90,
    "elite": 180
  },
  "dragon-flag": {
    "intermedio": 3,
    "avanzado": 8,
    "elite": 15
  },
  "australian-row": {
    "intermedio": 12,
    "avanzado": 20,
    "elite": 30
  },
  "hanging-leg-raise": {
    "intermedio": 8,
    "avanzado": 15,
    "elite": 25
  },
  "toes-to-bar": {
    "intermedio": 5,
    "avanzado": 12,
    "elite": 20
  },
  "one-arm-push-up": {
    "intermedio": 3,
    "avanzado": 8,
    "elite": 15
  },
  "one-arm-pull-up": {
    "intermedio": 1,
    "avanzado": 3,
    "elite": 8
  },
  "nordic-curl": {
    "intermedio": 3,
    "avanzado": 6,
    "elite": 12
  },
  "squat": {
    "intermedio": 30,
    "avanzado": 50,
    "elite": 100
  },
  "burpee": {
    "intermedio": 15,
    "avanzado": 25,
    "elite": 40
  },
  "iron-cross": {
    "intermedio": 3,
    "avanzado": 6,
    "elite": 12
  },
  "manna": {
    "intermedio": 3,
    "avanzado": 8,
    "elite": 15
  },
  "elbow-lever": {
    "intermedio": 15,
    "avanzado": 30,
    "elite": 45
  },
  "advanced-tuck-planche": {
    "intermedio": 10,
    "avanzado": 20,
    "elite": 35
  },
  "false-grip-hang": {
    "intermedio": 15,
    "avanzado": 30,
    "elite": 45
  },
  "german-hang": {
    "intermedio": 15,
    "avanzado": 30,
    "elite": 45
  },
  "ring-support-hold": {
    "intermedio": 20,
    "avanzado": 40,
    "elite": 60
  },
  "glute-bridge": {
    "intermedio": 20,
    "avanzado": 35,
    "elite": 50
  },
  "wall-handstand": {
    "intermedio": 30,
    "avanzado": 60,
    "elite": 90
  },
  "one-arm-front-lever": {
    "intermedio": 3,
    "avanzado": 6,
    "elite": 12
  },
  "planche-lean": {
    "intermedio": 20,
    "avanzado": 40,
    "elite": 60
  },
  "free-handstand": {
    "intermedio": 15,
    "avanzado": 30,
    "elite": 60
  },
  "deep-squat": {
    "intermedio": 20,
    "avanzado": 40,
    "elite": 60
  },
  "short-squat": {
    "intermedio": 30,
    "avanzado": 50,
    "elite": 80
  },
  "sit-up": {
    "intermedio": 20,
    "avanzado": 40,
    "elite": 60
  },
  "sissy-squat": {
    "intermedio": 10,
    "avanzado": 15,
    "elite": 25
  }
};

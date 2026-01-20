/**
 * CompartmentalProcessor.spec.ts
 * 
 * Tests for enhanced compartmental model processing with spatial types,
 * transport rules, and geometry processing.
 * 
 * Validates Requirements 3.1, 3.3
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { BNGLModel } from '../../types';
import { 
  processCompartmentalModel,
  CompartmentalProcessingOptions 
} from '../../services/simulation/CompartmentalProcessor';
import {
  validateSpatialStructure,
  validateTransportRules,
  validateDiffusionCoefficients
} from '../../services/simulation/SpatialValidator';

describe('CompartmentalProcessor', () => {
  
  describe('Enhanced Compartment Processing', () => {
    
    it('should process simple compartmental model with spatial types', async () => {
      const model: BNGLModel = {
        parameters: {},
        compartments: [
          { name: 'cell', dimension: 3, size: 1000 },
          { name: 'nucleus', dimension: 3, size: 100, parent: 'cell' }
        ],
        moleculeTypes: [],
        species: [
          { name: 'A', initialCount: 100, pattern: 'A()' },
          { name: 'B', initialCount: 50, pattern: 'B()' }
        ],
        reactions: [],
        observables: []
      };

      const result = await processCompartmentalModel(model, {
        autoDetectSpatialTypes: true,
        geometryInference: true
      });

      expect(result.spatialStructure).toBeDefined();
      expect(result.spatialStructure!.compartments).toHaveLength(2);
      
      const cellComp = result.spatialStructure!.compartments.find(c => c.name === 'cell');
      const nucleusComp = result.spatialStructure!.compartments.find(c => c.name === 'nucleus');
      
      expect(cellComp?.spatialType).toBe('spatial-3d');
      expect(nucleusComp?.spatialType).toBe('spatial-3d');
      expect(nucleusComp?.parent).toBe('cell');
      
      // Check geometry inference
      expect(cellComp?.geometry?.shape).toBe('sphere');
      expect(nucleusComp?.geometry?.shape).toBe('sphere');
    });

    it('should detect transport rules from inter-compartment reactions', async () => {
      const model: BNGLModel = {
        parameters: {},
        compartments: [
          { name: 'cytoplasm', dimension: 3, size: 1000 },
          { name: 'nucleus', dimension: 3, size: 100 }
        ],
        moleculeTypes: [],
        species: [
          { name: 'A_cyt', initialCount: 100, pattern: 'A@cytoplasm' },
          { name: 'A_nuc', initialCount: 10, pattern: 'A@nucleus' }
        ],
        reactions: [
          {
            reactants: ['A@cytoplasm'],
            products: ['A@nucleus'],
            rate: '0.1',
            rateConstant: 0.1
          }
        ],
        observables: []
      };

      const result = await processCompartmentalModel(model);

      expect(result.transportRules).toBeDefined();
      expect(result.transportRules!.length).toBeGreaterThan(0);
      
      const transportRule = result.transportRules![0];
      expect(transportRule.sourceCompartment).toBe('cytoplasm');
      expect(transportRule.targetCompartment).toBe('nucleus');
      expect(transportRule.transportedSpecies).toBe('A');
      expect(transportRule.mechanism).toBe('diffusion');
    });

    it('should create diffusion coefficients for spatial compartments', async () => {
      const model: BNGLModel = {
        parameters: {},
        compartments: [
          { name: 'cell', dimension: 3, size: 1000 }
        ],
        moleculeTypes: [],
        species: [
          { name: 'A', initialCount: 100, pattern: 'A()' },
          { name: 'B', initialCount: 50, pattern: 'B()' }
        ],
        reactions: [],
        observables: []
      };

      const result = await processCompartmentalModel(model, {
        defaultDiffusionCoefficient: 1e-9
      });

      expect(result.diffusionCoefficients).toBeDefined();
      expect(result.diffusionCoefficients!.length).toBe(2); // A and B
      
      const coeffA = result.diffusionCoefficients!.find(dc => dc.species === 'A');
      expect(coeffA?.coefficient).toBe(1e-9);
      expect(coeffA?.compartment).toBe('cell');
    });

    it('should handle well-mixed compartments correctly', async () => {
      const model: BNGLModel = {
        parameters: {},
        compartments: [
          { name: 'well_mixed', dimension: 0, size: 1 } // Dimension 0 = well-mixed
        ],
        moleculeTypes: [],
        species: [
          { name: 'A', initialCount: 100, pattern: 'A()' }
        ],
        reactions: [],
        observables: []
      };

      const result = await processCompartmentalModel(model);

      const comp = result.spatialStructure!.compartments[0];
      expect(comp.spatialType).toBe('well-mixed');
      expect(comp.discretization).toBeUndefined();
      
      // Should not create diffusion coefficients for well-mixed compartments
      expect(result.diffusionCoefficients!.length).toBe(0);
    });

    it('should validate compartmental model structure', async () => {
      const model: BNGLModel = {
        parameters: {},
        compartments: [
          { name: 'comp1', dimension: 3, size: 1000 },
          { name: 'comp2', dimension: 3, size: 500 }
        ],
        moleculeTypes: [],
        species: [],
        reactions: [],
        observables: []
      };

      const result = await processCompartmentalModel(model, {
        validateConnectivity: true
      });

      expect(result.spatialValidated).toBeDefined();
      expect(result.transportValidated).toBeDefined();
      expect(result.geometryValidated).toBeDefined();
    });

  });

  describe('Spatial Structure Validation', () => {
    
    it('should validate spatial structure connectivity', () => {
      const spatialStructure = {
        compartments: [
          { 
            name: 'cell', 
            dimension: 3, 
            size: 1000, 
            spatialType: 'spatial-3d' as const,
            adjacentCompartments: ['nucleus']
          },
          { 
            name: 'nucleus', 
            dimension: 3, 
            size: 100, 
            parent: 'cell',
            spatialType: 'spatial-3d' as const,
            adjacentCompartments: ['cell']
          }
        ],
        connections: [
          {
            sourceCompartment: 'cell',
            targetCompartment: 'nucleus',
            connectionType: 'membrane' as const,
            permeability: 1e-6
          }
        ],
        geometry: {
          shape: 'irregular' as const,
          dimensions: {}
        },
        coordinateSystem: 'cartesian' as const,
        units: {
          length: 'μm' as const,
          time: 's' as const,
          concentration: 'μM' as const
        }
      };

      const result = validateSpatialStructure(spatialStructure, {
        requireConnectivity: true
      });

      expect(result.valid).toBe(true);
      expect(result.errors.length).toBe(0);
    });

    it('should detect disconnected compartments', () => {
      const spatialStructure = {
        compartments: [
          { 
            name: 'comp1', 
            dimension: 3, 
            size: 1000, 
            spatialType: 'spatial-3d' as const
          },
          { 
            name: 'comp2', 
            dimension: 3, 
            size: 500, 
            spatialType: 'spatial-3d' as const
          }
        ],
        connections: [], // No connections
        geometry: {
          shape: 'irregular' as const,
          dimensions: {}
        },
        coordinateSystem: 'cartesian' as const,
        units: {
          length: 'μm' as const,
          time: 's' as const,
          concentration: 'μM' as const
        }
      };

      const result = validateSpatialStructure(spatialStructure, {
        requireConnectivity: true
      });

      expect(result.warnings.length).toBeGreaterThan(0);
      expect(result.warnings.some(w => w.type === 'connectivity')).toBe(true);
    });

    it('should validate geometry consistency', () => {
      const spatialStructure = {
        compartments: [
          { 
            name: 'cell', 
            dimension: 3, 
            size: 1000, 
            spatialType: 'spatial-3d' as const,
            geometry: {
              shape: 'sphere' as const,
              dimensions: { radius: 6.2 } // Volume ≈ 1000
            }
          }
        ],
        connections: [],
        geometry: {
          shape: 'irregular' as const,
          dimensions: {}
        },
        coordinateSystem: 'cartesian' as const,
        units: {
          length: 'μm' as const,
          time: 's' as const,
          concentration: 'μM' as const
        }
      };

      const result = validateSpatialStructure(spatialStructure, {
        strictGeometry: true,
        checkDimensionalConsistency: true
      });

      expect(result.valid).toBe(true);
    });

  });

  describe('Transport Rule Validation', () => {
    
    it('should validate transport rules against spatial structure', () => {
      const spatialStructure = {
        compartments: [
          { name: 'cytoplasm', dimension: 3, size: 1000, spatialType: 'spatial-3d' as const },
          { name: 'nucleus', dimension: 3, size: 100, spatialType: 'spatial-3d' as const }
        ],
        connections: [],
        geometry: { shape: 'irregular' as const, dimensions: {} },
        coordinateSystem: 'cartesian' as const,
        units: {
          length: 'μm' as const,
          time: 's' as const,
          concentration: 'μM' as const
        }
      };

      const transportRules = [
        {
          id: 'transport_1',
          sourceCompartment: 'cytoplasm',
          targetCompartment: 'nucleus',
          transportedSpecies: 'A',
          rate: '0.1',
          mechanism: 'diffusion' as const,
          direction: 'unidirectional' as const
        }
      ];

      const result = validateTransportRules(transportRules, spatialStructure);

      expect(result.valid).toBe(true);
      expect(result.errors.length).toBe(0);
    });

    it('should detect invalid compartment references in transport rules', () => {
      const spatialStructure = {
        compartments: [
          { name: 'cytoplasm', dimension: 3, size: 1000, spatialType: 'spatial-3d' as const }
        ],
        connections: [],
        geometry: { shape: 'irregular' as const, dimensions: {} },
        coordinateSystem: 'cartesian' as const,
        units: {
          length: 'μm' as const,
          time: 's' as const,
          concentration: 'μM' as const
        }
      };

      const transportRules = [
        {
          id: 'transport_1',
          sourceCompartment: 'cytoplasm',
          targetCompartment: 'nonexistent', // Invalid compartment
          transportedSpecies: 'A',
          rate: '0.1',
          mechanism: 'diffusion' as const,
          direction: 'unidirectional' as const
        }
      ];

      const result = validateTransportRules(transportRules, spatialStructure);

      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors.some(e => e.type === 'transport')).toBe(true);
    });

  });

  describe('Diffusion Coefficient Validation', () => {
    
    it('should validate diffusion coefficients for physical reasonableness', () => {
      const diffusionCoefficients = [
        {
          species: 'A',
          compartment: 'cell',
          coefficient: 1e-10, // Reasonable value
          temperature: 310
        },
        {
          species: 'B',
          compartment: 'cell',
          coefficient: -1e-10, // Invalid negative value
          temperature: 310
        }
      ];

      const result = validateDiffusionCoefficients(diffusionCoefficients, {
        validateDiffusionLimits: true
      });

      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0].type).toBe('diffusion');
    });

    it('should warn about extreme diffusion coefficient values', () => {
      const diffusionCoefficients = [
        {
          species: 'A',
          compartment: 'cell',
          coefficient: 1e-15, // Very slow
          temperature: 310
        },
        {
          species: 'B',
          compartment: 'cell',
          coefficient: 1e-5, // Very fast
          temperature: 310
        }
      ];

      const result = validateDiffusionCoefficients(diffusionCoefficients, {
        validateDiffusionLimits: true
      });

      expect(result.valid).toBe(true);
      expect(result.warnings.length).toBe(2);
      expect(result.warnings.every(w => w.type === 'accuracy')).toBe(true);
    });

  });

  describe('Integration with Existing CompartmentResolver', () => {
    
    it('should work with models that have no compartments', async () => {
      const model: BNGLModel = {
        parameters: {},
        compartments: [],
        moleculeTypes: [],
        species: [
          { name: 'A', initialCount: 100, pattern: 'A()' }
        ],
        reactions: [],
        observables: []
      };

      const result = await processCompartmentalModel(model);

      expect(result.spatialValidated).toBe(true);
      expect(result.transportValidated).toBe(true);
      expect(result.geometryValidated).toBe(true);
      expect(result.spatialStructure).toBeUndefined();
    });

    it('should preserve existing compartment resolution data', async () => {
      const model: BNGLModel = {
        parameters: { V: 1000 },
        compartments: [
          { name: 'cell', dimension: 3, size: 'V' }
        ],
        moleculeTypes: [],
        species: [],
        reactions: [],
        observables: []
      };

      const result = await processCompartmentalModel(model);

      expect(result.compartmentsResolved).toBe(true);
      const cellComp = result.spatialStructure!.compartments[0];
      expect(cellComp.resolvedVolume).toBeDefined();
      expect(cellComp.scalingFactor).toBeDefined();
    });

  });

});

describe('Property Tests for Compartmental Processing', () => {
  
  it('should handle various compartment configurations without errors', async () => {
    // Test different compartment configurations
    const configurations = [
      // Single compartment
      {
        compartments: [{ name: 'cell', dimension: 3, size: 1000 }]
      },
      // Hierarchical compartments
      {
        compartments: [
          { name: 'cell', dimension: 3, size: 1000 },
          { name: 'nucleus', dimension: 3, size: 100, parent: 'cell' }
        ]
      },
      // Multiple independent compartments
      {
        compartments: [
          { name: 'cell1', dimension: 3, size: 1000 },
          { name: 'cell2', dimension: 3, size: 800 }
        ]
      },
      // Mixed dimensions
      {
        compartments: [
          { name: 'volume', dimension: 3, size: 1000 },
          { name: 'membrane', dimension: 2, size: 100 },
          { name: 'filament', dimension: 1, size: 10 }
        ]
      }
    ];

    for (const config of configurations) {
      const model: BNGLModel = {
        parameters: {},
        compartments: config.compartments,
        moleculeTypes: [],
        species: [{ name: 'A', initialCount: 100, pattern: 'A()' }],
        reactions: [],
        observables: []
      };

      const result = await processCompartmentalModel(model);
      
      expect(result).toBeDefined();
      expect(result.spatialStructure?.compartments.length).toBe(config.compartments.length);
      
      // All compartments should have spatial types assigned
      for (const comp of result.spatialStructure!.compartments) {
        expect(comp.spatialType).toBeDefined();
        expect(['well-mixed', 'spatial-1d', 'spatial-2d', 'spatial-3d']).toContain(comp.spatialType);
      }
    }
  });

  it('should maintain consistency between compartment properties and spatial types', async () => {
    const model: BNGLModel = {
      parameters: {},
      compartments: [
        { name: 'comp1d', dimension: 1, size: 10 },
        { name: 'comp2d', dimension: 2, size: 100 },
        { name: 'comp3d', dimension: 3, size: 1000 }
      ],
      moleculeTypes: [],
      species: [],
      reactions: [],
      observables: []
    };

    const result = await processCompartmentalModel(model, {
      autoDetectSpatialTypes: true
    });

    const comp1d = result.spatialStructure!.compartments.find(c => c.name === 'comp1d');
    const comp2d = result.spatialStructure!.compartments.find(c => c.name === 'comp2d');
    const comp3d = result.spatialStructure!.compartments.find(c => c.name === 'comp3d');

    expect(comp1d?.spatialType).toBe('spatial-1d');
    expect(comp2d?.spatialType).toBe('spatial-2d');
    expect(comp3d?.spatialType).toBe('spatial-3d');

    // Discretization should only be present for spatial compartments
    expect(comp1d?.discretization).toBeDefined();
    expect(comp2d?.discretization).toBeDefined();
    expect(comp3d?.discretization).toBeDefined();
  });

});
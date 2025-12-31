// src/services/ParameterEstimation.ts
// Phase 2: TensorFlow.js-based parameter estimation with Bayesian inference

import * as tf from '@tensorflow/tfjs';
// Note: BNGLModel is defined in the root types.ts file
// This type import is used for documentation purposes only
// The actual model object is passed at runtime

export interface ParameterEstimationConfig {
  nIterations?: number;
  learningRate?: number;
  batchSize?: number;
  validationSplit?: number;
  verbose?: boolean;
}

export interface ParameterPrior {
  mean: number;
  std: number;
  min?: number;
  max?: number;
}

export interface EstimationResult {
  posteriorMean: number[];
  posteriorStd: number[];
  elbo: number[];
  convergence: boolean;
  iterations: number;
}

export interface SimulationData {
  timePoints: number[];
  observables: Map<string, number[]>;
}

/**
 * Variational Bayesian Parameter Estimator using TensorFlow.js
 * Implements stochastic variational inference (SVI) for parameter estimation
 */
export class VariationalParameterEstimator {
  private model: any; // BNGLModel from root types.ts
  private data: SimulationData;
  private parameterNames: string[];
  private priors: Map<string, ParameterPrior>;
  
  // Variational parameters
  private mu: tf.Variable;
  private logSigma: tf.Variable;
  
  private nParams: number;
  private optimizer: tf.Optimizer;
  
  constructor(
    model: any, // BNGLModel
    data: SimulationData,
    parameterNames: string[],
    priors: Map<string, ParameterPrior>
  ) {
    this.model = model;
    this.data = data;
    this.parameterNames = parameterNames;
    this.priors = priors;
    this.nParams = parameterNames.length;
    
    // Initialize variational parameters from priors
    const initialMu = parameterNames.map(name => {
      const prior = priors.get(name);
      return prior ? Math.log(prior.mean) : 0; // Log-space for positive parameters
    });
    
    const initialLogSigma = parameterNames.map(name => {
      const prior = priors.get(name);
      return prior ? Math.log(prior.std) : -1; // Small initial uncertainty
    });
    
    this.mu = tf.variable(tf.tensor1d(initialMu));
    this.logSigma = tf.variable(tf.tensor1d(initialLogSigma));
    this.optimizer = tf.train.adam(0.01);
  }
  
  /**
   * Sample parameters from variational distribution using reparameterization trick
   */
  private sampleParameters(): tf.Tensor1D {
    return tf.tidy(() => {
      const eps = tf.randomNormal([this.nParams]);
      const sigma = tf.exp(this.logSigma);
      return tf.add(this.mu, tf.mul(sigma, eps)) as tf.Tensor1D;
    });
  }
  
  /**
   * Compute Evidence Lower Bound (ELBO)
   * ELBO = E_q[log p(y|theta)] - KL[q(theta) || p(theta)]
   */
  private computeELBO(nSamples: number = 5): tf.Scalar {
    return tf.tidy(() => {
      let totalLogLik = tf.scalar(0);
      
      // Monte Carlo estimate of expected log likelihood
      for (let i = 0; i < nSamples; i++) {
        const logParams = this.sampleParameters();
        const params = tf.exp(logParams); // Transform back to positive space
        
        const logLik = this.computeLogLikelihood(params);
        totalLogLik = tf.add(totalLogLik, logLik);
      }
      
      const avgLogLik = tf.div(totalLogLik, nSamples);
      
      // KL divergence from prior
      const kl = this.computeKLDivergence();
      
      // ELBO = log likelihood - KL divergence
      return tf.sub(avgLogLik, kl) as tf.Scalar;
    });
  }
  
  /**
   * Compute log likelihood of observed data given parameters
   */
  private computeLogLikelihood(params: tf.Tensor1D): tf.Scalar {
    return tf.tidy(() => {
      // Simulate model with given parameters
      const paramsArray = params.arraySync() as number[];
      const predicted = this.simulateWithParams(paramsArray);
      
      // Compute Gaussian log likelihood
      // log p(y|theta) = -0.5 * sum((y - f(theta))^2 / sigma^2)
      const observationNoise = 0.1; // Assume known observation noise
      
<<<<<<< Updated upstream
      let totalLogLik = tf.scalar(0);
=======
      let totalLogLik = 0;
>>>>>>> Stashed changes
      
      // Compare predictions with observations for each observable
      for (const [obsName, obsData] of this.data.observables) {
        if (predicted.has(obsName)) {
          const predData = predicted.get(obsName)!;
<<<<<<< Updated upstream
          const obsTensor = tf.tensor1d(obsData);
          const predTensor = tf.tensor1d(predData);
          
          const residuals = tf.sub(obsTensor, predTensor);
          const squaredError = tf.sum(tf.square(residuals));
          const logLik = tf.div(squaredError, -2 * observationNoise * observationNoise);
          
          totalLogLik = tf.add(totalLogLik, logLik);
        }
      }
      
      return totalLogLik as tf.Scalar;
=======
          
          // Compute squared errors
          for (let i = 0; i < obsData.length; i++) {
            const residual = obsData[i] - (predData[i] || 0);
            totalLogLik -= (residual * residual) / (2 * observationNoise * observationNoise);
          }
        }
      }
      
      return tf.scalar(totalLogLik);
>>>>>>> Stashed changes
    });
  }
  
  /**
   * Compute KL divergence between variational posterior and prior
   * KL[q(theta) || p(theta)] for Gaussian distributions
   */
  private computeKLDivergence(): tf.Scalar {
    return tf.tidy(() => {
<<<<<<< Updated upstream
      let totalKL = tf.scalar(0);
=======
      let totalKL = 0;
>>>>>>> Stashed changes
      
      for (let i = 0; i < this.nParams; i++) {
        const paramName = this.parameterNames[i];
        const prior = this.priors.get(paramName);
        
        if (!prior) continue;
        
<<<<<<< Updated upstream
        const priorMu = Math.log(prior.mean);
        const priorSigma = prior.std / prior.mean; // Log-space std
        
        const muSlice = this.mu.slice([i], [1]);
        const logSigmaSlice = this.logSigma.slice([i], [1]);
        const sigma = tf.exp(logSigmaSlice);
        
        // KL = log(sigma_prior/sigma_post) + (sigma_post^2 + (mu_post - mu_prior)^2)/(2*sigma_prior^2) - 0.5
        const logSigmaRatio = Math.log(priorSigma) - logSigmaSlice.dataSync()[0];
        const muDiff = tf.sub(muSlice, priorMu);
        const variance = tf.square(sigma);
        
        const kl = tf.add(
          logSigmaRatio,
          tf.sub(
            tf.div(
              tf.add(variance, tf.square(muDiff)),
              2 * priorSigma * priorSigma
            ),
            0.5
          )
        );
        
        totalKL = tf.add(totalKL, kl);
      }
      
      return totalKL as tf.Scalar;
=======
        const priorMu = Math.log(Math.max(prior.mean, 1e-10));
        const priorSigma = Math.max(prior.std / Math.max(prior.mean, 1e-10), 0.01);
        
        // Get current variational parameters as numbers
        const muVal = this.mu.slice([i], [1]).dataSync()[0];
        const logSigmaVal = this.logSigma.slice([i], [1]).dataSync()[0];
        const sigmaVal = Math.exp(logSigmaVal);
        
        // KL divergence for Gaussians (analytical form)
        // KL = log(sigma_prior/sigma_post) + (sigma_post^2 + (mu_post - mu_prior)^2)/(2*sigma_prior^2) - 0.5
        const logSigmaRatio = Math.log(priorSigma) - logSigmaVal;
        const muDiff = muVal - priorMu;
        const variance = sigmaVal * sigmaVal;
        
        const kl = logSigmaRatio + (variance + muDiff * muDiff) / (2 * priorSigma * priorSigma) - 0.5;
        totalKL += kl;
      }
      
      return tf.scalar(totalKL);
>>>>>>> Stashed changes
    });
  }
  
  /**
   * Simulate model with given parameters
   * This is a placeholder - actual implementation should use ODESolver
   */
  private simulateWithParams(params: number[]): Map<string, number[]> {
    // TODO: Integrate with actual ODESolver
    // For now, return dummy predictions
    const result = new Map<string, number[]>();
    
    for (const [obsName, obsData] of this.data.observables) {
      // Simple placeholder: slightly perturbed observations
      const pred = obsData.map(v => v * (0.9 + Math.random() * 0.2));
      result.set(obsName, pred);
    }
    
    return result;
  }
  
  /**
   * Perform variational inference to estimate parameters
   */
  async fit(config: ParameterEstimationConfig = {}): Promise<EstimationResult> {
    const {
      nIterations = 1000,
      learningRate = 0.01,
      verbose = true
    } = config;
    
    this.optimizer = tf.train.adam(learningRate);
    const elboHistory: number[] = [];
    
    for (let iter = 0; iter < nIterations; iter++) {
<<<<<<< Updated upstream
      // Minimize negative ELBO
      const loss = this.optimizer.minimize(() => {
        const elbo = this.computeELBO(5);
        return tf.neg(elbo);
      }, true, [this.mu, this.logSigma]);
      
      if (loss) {
        const elboValue = -(loss.dataSync()[0]);
        elboHistory.push(elboValue);
        
        if (verbose && iter % 100 === 0) {
          console.log(`Iteration ${iter}, ELBO: ${elboValue.toFixed(4)}`);
        }
=======
      // Compute loss and gradients manually
      const { value, grads } = tf.variableGrads(() => {
        // Sample from variational distribution
        const eps = tf.randomNormal([this.nParams]);
        const sigma = tf.exp(this.logSigma);
        const logParams = tf.add(this.mu, tf.mul(sigma, eps));
        const params = tf.exp(logParams);
        
        // Compute log likelihood (simplified - using L2 loss as proxy)
        const paramsArray = params.arraySync() as number[];
        const predicted = this.simulateWithParams(paramsArray);
        
        let logLikValue = 0;
        const observationNoise = 10.0; // Larger noise for stability
        
        for (const [obsName, obsData] of this.data.observables) {
          if (predicted.has(obsName)) {
            const predData = predicted.get(obsName)!;
            for (let i = 0; i < obsData.length; i++) {
              const residual = obsData[i] - (predData[i] || 0);
              logLikValue -= (residual * residual) / (2 * observationNoise * observationNoise);
            }
          }
        }
        
        // Compute KL divergence
        let klValue = 0;
        for (let i = 0; i < this.nParams; i++) {
          const paramName = this.parameterNames[i];
          const prior = this.priors.get(paramName);
          if (!prior) continue;
          
          const priorMu = Math.log(Math.max(prior.mean, 1e-10));
          const priorSigma = Math.max(prior.std / Math.max(prior.mean, 1e-10), 0.1);
          
          const muVal = this.mu.slice([i], [1]).dataSync()[0];
          const logSigmaVal = this.logSigma.slice([i], [1]).dataSync()[0];
          const sigmaVal = Math.exp(logSigmaVal);
          
          const logSigmaRatio = Math.log(priorSigma) - logSigmaVal;
          const muDiff = muVal - priorMu;
          const variance = sigmaVal * sigmaVal;
          
          klValue += logSigmaRatio + (variance + muDiff * muDiff) / (2 * priorSigma * priorSigma) - 0.5;
        }
        
        // ELBO = log_lik - KL, so negative ELBO = KL - log_lik
        const negElbo = klValue - logLikValue;
        return tf.scalar(negElbo);
      });
      
      // Apply gradients
      this.optimizer.applyGradients(grads);
      
      const elboValue = -value.dataSync()[0];
      elboHistory.push(elboValue);
      value.dispose();
      
      if (verbose && iter % 100 === 0) {
        console.log(`Iteration ${iter}, ELBO: ${elboValue.toFixed(4)}`);
>>>>>>> Stashed changes
      }
    }
    
    // Extract posterior parameters
    const posteriorMean = this.mu.arraySync() as number[];
    const posteriorStd = tf.exp(this.logSigma).arraySync() as number[];
    
    // Transform from log-space to original space
    const meanOriginal = posteriorMean.map(v => Math.exp(v));
    const stdOriginal = posteriorStd.map((s, i) => Math.exp(posteriorMean[i]) * s);
    
    // Check convergence (ELBO stabilized)
    const recentElbo = elboHistory.slice(-100);
    const elboStd = this.computeStd(recentElbo);
<<<<<<< Updated upstream
    const convergence = elboStd < 0.01;
=======
    const convergence = elboStd < 0.01 * Math.abs(recentElbo[recentElbo.length - 1] || 1);
>>>>>>> Stashed changes
    
    return {
      posteriorMean: meanOriginal,
      posteriorStd: stdOriginal,
      elbo: elboHistory,
      convergence,
      iterations: nIterations
    };
  }
  
  private computeStd(values: number[]): number {
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const variance = values.reduce((a, b) => a + (b - mean) ** 2, 0) / values.length;
    return Math.sqrt(variance);
  }
  
  /**
   * Generate samples from posterior distribution
   */
  async samplePosterior(nSamples: number): Promise<number[][]> {
    const samples: number[][] = [];
    
    for (let i = 0; i < nSamples; i++) {
      const logParams = this.sampleParameters();
      const params = tf.exp(logParams).arraySync() as number[];
      samples.push(params);
      logParams.dispose();
    }
    
    return samples;
  }
  
  /**
   * Cleanup TensorFlow resources
   */
  dispose(): void {
    this.mu.dispose();
    this.logSigma.dispose();
  }
}

/**
 * Simple parameter sweep using TensorFlow.js for parallel evaluation
 */
export class ParameterSweeper {
  private model: any; // BNGLModel
  
  constructor(model: any) { // BNGLModel
    this.model = model;
  }
  
  /**
   * Perform grid search over parameter space
   */
  async gridSearch(
    paramRanges: Map<string, [number, number]>,
    nPointsPerParam: number = 10
  ): Promise<Map<string, number[]>> {
    // Latin hypercube sampling for efficient space coverage
    const paramNames = Array.from(paramRanges.keys());
    const samples = this.latinHypercubeSample(paramRanges, nPointsPerParam ** paramNames.length);
    
    // TODO: Evaluate model at each parameter set
    // Return best parameters based on some objective function
    
    return samples;
  }
  
  /**
   * Latin Hypercube Sampling for efficient parameter space exploration
   */
  private latinHypercubeSample(
    paramRanges: Map<string, [number, number]>,
    nSamples: number
  ): Map<string, number[]> {
    const result = new Map<string, number[]>();
    
    for (const [param, [min, max]] of paramRanges) {
      const samples: number[] = [];
      const interval = (max - min) / nSamples;
      
      // Generate stratified random samples
      for (let i = 0; i < nSamples; i++) {
        const lower = min + i * interval;
        const upper = min + (i + 1) * interval;
        samples.push(lower + Math.random() * (upper - lower));
      }
      
      // Shuffle to break correlation between parameters
      for (let i = samples.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [samples[i], samples[j]] = [samples[j], samples[i]];
      }
      
      result.set(param, samples);
    }
    
    return result;
  }
}

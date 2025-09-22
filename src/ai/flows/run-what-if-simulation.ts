'use server';
/**
 * @fileOverview This file defines a Genkit flow for running 'what-if' simulations to predict the impact of input conditions on train schedules.
 *
 * - runWhatIfSimulation - A function that runs the what-if simulation.
 * - RunWhatIfSimulationInput - The input type for the runWhatIfSimulation function.
 * - RunWhatIfSimulationOutput - The return type for the runWhatIfSimulation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RunWhatIfSimulationInputSchema = z.object({
  maintenanceDelays: z
    .string()
    .describe('A description of any maintenance delays.'),
  trackClosures: z.string().describe('A description of any track closures.'),
  otherConditions: z
    .string()
    .describe('A description of any other conditions to simulate.'),
});
export type RunWhatIfSimulationInput = z.infer<
  typeof RunWhatIfSimulationInputSchema
>;

const RunWhatIfSimulationOutputSchema = z.object({
  predictedScheduleImpact: z
    .string()
    .describe('The predicted impact on the train schedule.'),
  resourceAllocationChanges: z
    .string()
    .describe('The recommended changes to resource allocation.'),
  potentialDisruptions: z
    .string()
    .describe('A description of potential disruptions.'),
});
export type RunWhatIfSimulationOutput = z.infer<
  typeof RunWhatIfSimulationOutputSchema
>;

export async function runWhatIfSimulation(
  input: RunWhatIfSimulationInput
): Promise<RunWhatIfSimulationOutput> {
  return runWhatIfSimulationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'runWhatIfSimulationPrompt',
  input: {schema: RunWhatIfSimulationInputSchema},
  output: {schema: RunWhatIfSimulationOutputSchema},
  prompt: `You are a train schedule optimizer. Given the following conditions, predict the impact on the train schedule, recommend changes to resource allocation, and describe potential disruptions.\n\nMaintenance Delays: {{{maintenanceDelays}}}\nTrack Closures: {{{trackClosures}}}\nOther Conditions: {{{otherConditions}}}`,
});

const runWhatIfSimulationFlow = ai.defineFlow(
  {
    name: 'runWhatIfSimulationFlow',
    inputSchema: RunWhatIfSimulationInputSchema,
    outputSchema: RunWhatIfSimulationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

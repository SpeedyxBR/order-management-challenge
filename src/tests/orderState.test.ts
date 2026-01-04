import { describe, it, expect } from 'vitest';

const STATE_FLOW: Record<string, string | null> = {
  CREATED: 'ANALYSIS',
  ANALYSIS: 'COMPLETED',
  COMPLETED: null,
};

const getNextState = (currentState: string): string | null => {
  return STATE_FLOW[currentState] || null;
};

const canAdvance = (currentState: string): boolean => {
  return STATE_FLOW[currentState] !== null && STATE_FLOW[currentState] !== undefined;
};

describe('Order State Transitions', () => {
  
  describe('getNextState', () => {
    
    it('deve retornar ANALYSIS quando state atual é CREATED', () => {
      const result = getNextState('CREATED');
      expect(result).toBe('ANALYSIS');
    });

    it('deve retornar COMPLETED quando state atual é ANALYSIS', () => {
      const result = getNextState('ANALYSIS');
      expect(result).toBe('COMPLETED');
    });

    it('deve retornar null quando state atual é COMPLETED', () => {
      const result = getNextState('COMPLETED');
      expect(result).toBeNull();
    });

    it('deve retornar null para state inválido', () => {
      const result = getNextState('INVALID_STATE');
      expect(result).toBeNull();
    });

  });

  describe('canAdvance', () => {

    it('deve permitir avançar quando state é CREATED', () => {
      const result = canAdvance('CREATED');
      expect(result).toBe(true);
    });

    it('deve permitir avançar quando state é ANALYSIS', () => {
      const result = canAdvance('ANALYSIS');
      expect(result).toBe(true);
    });

    it('não deve permitir avançar quando state é COMPLETED', () => {
      const result = canAdvance('COMPLETED');
      expect(result).toBe(false);
    });

    it('não deve permitir avançar para state inválido', () => {
      const result = canAdvance('INVALID');
      expect(result).toBe(false);
    });

  });

  describe('State Flow Order', () => {

    it('deve seguir a ordem correta: CREATED -> ANALYSIS -> COMPLETED', () => {
      let state = 'CREATED';
      
      state = getNextState(state) as string;
      expect(state).toBe('ANALYSIS');
      
      state = getNextState(state) as string;
      expect(state).toBe('COMPLETED');
      
      const finalState = getNextState(state);
      expect(finalState).toBeNull();
    });

    it('não deve permitir pular etapas', () => {
      const state = 'CREATED';
      const nextState = getNextState(state);
      
      expect(nextState).not.toBe('COMPLETED');
      expect(nextState).toBe('ANALYSIS');
    });

    it('não deve permitir retroceder', () => {
      const statesOrder = ['CREATED', 'ANALYSIS', 'COMPLETED'];
      
      for (let i = 0; i < statesOrder.length; i++) {
        const nextState = getNextState(statesOrder[i]);
        
        if (nextState) {
          const currentIndex = statesOrder.indexOf(statesOrder[i]);
          const nextIndex = statesOrder.indexOf(nextState);
          expect(nextIndex).toBeGreaterThan(currentIndex);
        }
      }
    });

  });

});

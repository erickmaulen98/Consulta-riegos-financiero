import { useState } from 'react';
import type { FormEvent } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { getScore } from '../services/score.service';
import type { ScoreResult } from '../types';
import { ErrorMessage } from '../components/ErrorMesage';

export function ScorePage() {
const { user, logout } = useAuth();
const isUser = user?.role === 'user';
const [rut, setRut] = useState(isUser ? user?.rut ?? '' : '');
const [result, setResult] = useState<ScoreResult | null>(null);
const [error, setError] = useState<string | null>(null);
const [loading, setLoading] = useState(false);

async function handleSubmit(event: FormEvent) {
  event.preventDefault();
  setError(null);
  setResult(null);
  setLoading(true);

  try {
    const data = await getScore(rut);
    setResult(data);
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.status === 401) {
      setError('Tu sesión expiró o no es válida. Vuelve a iniciar sesión.');
      logout();
      return;
    }
    if (axios.isAxiosError(err) && err.response?.data?.error) {
      setError(err.response.data.error);
      return;
    }
    setError('No se pudo consultar el score. Intenta nuevamente.');
  } finally {
    setLoading(false);
  }
}

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Consulta de Score Financiero</h1>

        <label>
          RUT
          <input
            value={rut}
            onChange={(e) => setRut(e.target.value)}
            disabled={isUser}
            required
          />
        </label>

        {isUser && <p>Solo puedes consultar tu propio RUT.</p>}

        {error && <ErrorMessage message={error} />}

        <button type="submit" disabled={loading}>
          {loading ? 'Consultando...' : 'Consultar'}
        </button>
      </form>

      {result && (
        <div>
          <h2>Resultado</h2>
          <dl>
            <dt>RUT</dt>
            <dd>{result.rut}</dd>
            <dt>Score</dt>
            <dd>{result.score}</dd>
            <dt>Fecha</dt>
            <dd>{new Date(result.fecha).toLocaleString()}</dd>
          </dl>
        </div>
      )}
    </div>
  );
}
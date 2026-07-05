/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Episode {
  id: string;
  title: string;
  doctor: string;
  year: string;
  synopsis: string;
  videoUrl: string;
  poster: string;
  parts: number;
  season: number;
  category: 'classic-10' | 'classic-12' | 'spin-off' | 'special' | 'modern';
}

export interface Season {
  number: number;
  name: string;
}

export interface SiteUpdate {
  version: string;
  title: string;
  objective: string;
  date: string;
  implementations: {
    title: string;
    description: string;
  }[];
}

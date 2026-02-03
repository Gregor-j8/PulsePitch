export interface FormationTemplate {
  name: string;
  displayName: string;
  description: string;
}

export const FORMATION_TEMPLATES: Record<string, FormationTemplate> = {
  '4-4-2': {
    name: '4-4-2',
    displayName: '4-4-2 (Balanced)',
    description: 'Classic balanced formation with four defenders, four midfielders, and two strikers'
  },
  '4-3-3': {
    name: '4-3-3',
    displayName: '4-3-3 (Attacking)',
    description: 'Attacking formation with four defenders, three midfielders, and three forwards'
  },
  '3-5-2': {
    name: '3-5-2',
    displayName: '3-5-2 (Wing Play)',
    description: 'Wing-oriented formation with three defenders, five midfielders, and two strikers'
  },
  '5-3-2': {
    name: '5-3-2',
    displayName: '5-3-2 (Defensive)',
    description: 'Defensive formation with five defenders, three midfielders, and two forwards'
  },
  '4-2-3-1': {
    name: '4-2-3-1',
    displayName: '4-2-3-1 (Modern)',
    description: 'Modern formation with four defenders, two defensive midfielders, three attacking midfielders, and one striker'
  }
};

export const FORMATION_TEMPLATE_OPTIONS = Object.values(FORMATION_TEMPLATES).map(template => ({
  value: template.name,
  label: template.displayName
}));

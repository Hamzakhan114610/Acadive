import { CampusBulletinCard } from '../types';

/**
 * Strict Zero-Chat Campus & Field Bulletin Data
 * Structural event cards only. No comments, no direct messaging.
 */
export const BulletinData: CampusBulletinCard[] = [
  {
    id: 'bulletin-1',
    title: 'Fast-NUCES Procom Annual Technology Championship',
    hostCampus: 'FAST-NUCES Karachi Campus',
    domainTag: 'Computer Science',
    eventDate: '2026-11-28',
    venueOrFormat: 'FAST City Campus, Shah Latif Town, Karachi',
    registrationDeadline: '2026-11-18',
    registrationUrl: 'https://procom.nu.edu.pk',
    sourceAttribution: 'FAST ACM & IEEE Student Branch Official Circular',
    verificationStatus: 'verified',
    usefulCount: 142,
  },
  {
    id: 'bulletin-2',
    title: 'NED Mechanical Engineering Symposium & Auto-Show',
    hostCampus: 'NED University of Engineering & Technology',
    domainTag: 'Mechanical Engineering',
    eventDate: '2026-12-05',
    venueOrFormat: 'Main Auditorium, NED University, Karachi',
    registrationDeadline: '2026-11-26',
    registrationUrl: 'https://neduet.edu.pk/mechanical-symposium',
    sourceAttribution: 'Department of Mechanical Engineering Circular No. ME/26/102',
    verificationStatus: 'verified',
    usefulCount: 98,
  },
  {
    id: 'bulletin-3',
    title: 'Habib University Post-Secondary Design Sprint',
    hostCampus: 'Habib University, Karachi',
    domainTag: 'UI/UX & Product Design',
    eventDate: '2026-12-10',
    venueOrFormat: 'H.M. Khoja Auditorium & Design Lab, Habib University',
    registrationDeadline: '2026-12-01',
    registrationUrl: 'https://habib.edu.pk/design-sprint',
    sourceAttribution: 'School of Arts, Humanities and Social Sciences (AHSS)',
    verificationStatus: 'verified',
    usefulCount: 87,
  },
  {
    id: 'bulletin-4',
    title: 'Dow University Health Science Research Day',
    hostCampus: 'Dow University of Health Sciences (DUHS)',
    domainTag: 'Medical & Life Sciences',
    eventDate: '2026-12-12',
    venueOrFormat: 'Ojha Campus Auditorium, Karachi',
    registrationDeadline: '2026-11-30',
    registrationUrl: 'https://duhs.edu.pk/research-day',
    sourceAttribution: 'DUHS Directorate of Research Circular',
    verificationStatus: 'verified',
    usefulCount: 115,
  },
];

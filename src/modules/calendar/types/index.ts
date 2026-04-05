export interface CalendarEvent {
  kind:         string;
  etag:         string;
  id:           string | number;
  status:       string;
  htmlLink:     string;
  created:      string; // ISO Date String
  updated:      string; // ISO Date String
  summary:      string;
  description?: string;
  colorId?:     string;
  creator:      Creator;
  organizer:    Organizer;
  start:        EventDateTime;
  end:          EventDateTime;
  iCalUID:      string;
  sequence:     number;
  reminders:    Reminders;
  eventType:    string;
}

export interface Creator {
  email: string;
}

export interface Organizer {
  email:       string;
  displayName: string;
  self:        boolean;
}

export interface EventDateTime {
  dateTime: string; // ISO Date String con Offset (e.g., -05:00)
  timeZone: string;
}

export interface Reminders {
  useDefault: boolean;
}

export interface CalendarDay {
  id: string;
  dayIndex: number;
  day: number;
  dayFromEnd: number;
  weekday: number;
  weekdayOrdinal: number;
  weekdayOrdinalFromEnd: number;
  week: number;
  weekFromEnd: number;
  weeknumber: number;
  month: number;
  year: number;
  date: Date;
  position: number;
  label: string;
  ariaLabel: string;
  weekdayPosition: number;
  weekdayPositionFromEnd: number;
  weekPosition: number;
  isoWeeknumber: number;
  startDate: Date;
  noonDate: Date;
  endDate: Date;
  isToday: boolean;
  isFirstDay: boolean;
  isLastDay: boolean;
  isDisabled: boolean;
  isFocusable: boolean;
  inMonth: boolean;
  inPrevMonth: boolean;
  inNextMonth: boolean;
  onTop: boolean;
  onBottom: boolean;
  onLeft: boolean;
  onRight: boolean;
  classes: Array<string | Object>;
  locale: Locale;
}

export interface EventForm {
  title: string
  description: string
  time: string
}
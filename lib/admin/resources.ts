import { facilityIconNames } from '@/lib/icons'

export type FieldType = 'text' | 'textarea' | 'select' | 'image' | 'file' | 'number' | 'boolean'

export type Field = {
  name: string
  label: string
  type: FieldType
  required?: boolean
  max?: number
  rows?: number
  help?: string
  placeholder?: string
  options?: { value: string; label: string }[]
  optionsFrom?: 'departments'
  /** Link fields (image, file) accept an uploaded /uploads path, a /images path or an https URL. */
  autoSlugFrom?: string
}

export type Column = { key: string; label: string; kind?: 'text' | 'image' | 'badge' | 'date' }

export type ModelName =
  | 'heroSlide'
  | 'post'
  | 'department'
  | 'course'
  | 'staffProfile'
  | 'facility'
  | 'galleryImage'
  | 'download'
  | 'testimonial'
  | 'partner'

export type Resource = {
  key: string
  label: string
  singular: string
  description: string
  model: ModelName
  fields: Field[]
  columns: Column[]
  search: string[]
  titleField: string
  imageField?: string
  include?: Record<string, boolean>
  orderBy: Record<string, 'asc' | 'desc'>[]
  filters?: { name: string; label: string; options: { value: string; label: string }[] }[]
  publicPath?: string
}

const bool = (name: string, label: string, help?: string): Field => ({ name, label, type: 'boolean', help })

export const resources: Resource[] = [
  {
    key: 'hero',
    label: 'Homepage banners',
    singular: 'banner',
    description: 'The large slides at the top of the homepage.',
    model: 'heroSlide',
    titleField: 'title',
    imageField: 'image',
    search: ['title', 'eyebrow', 'text'],
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
    columns: [
      { key: 'image', label: 'Image', kind: 'image' },
      { key: 'title', label: 'Title' },
      { key: 'eyebrow', label: 'Label' },
      { key: 'sortOrder', label: 'Order' },
      { key: 'status', label: 'Status', kind: 'badge' },
    ],
    fields: [
      { name: 'image', label: 'Banner image', type: 'image', required: true, help: 'Landscape photo, at least 1600px wide works best.' },
      { name: 'alt', label: 'Image description (alt text)', type: 'text', required: true, max: 255, help: 'Describe the picture for visitors using screen readers.' },
      { name: 'eyebrow', label: 'Small heading above title', type: 'text', required: true, max: 255 },
      { name: 'title', label: 'Title', type: 'text', required: true, max: 255 },
      { name: 'text', label: 'Supporting text', type: 'textarea', required: true, max: 1000, rows: 3 },
      { name: 'sortOrder', label: 'Display order', type: 'number', help: 'Lower numbers appear first.' },
    ],
  },
  {
    key: 'posts',
    label: 'News & announcements',
    singular: 'post',
    description: 'News, announcements and articles shown on the homepage and news section.',
    model: 'post',
    titleField: 'title',
    imageField: 'image',
    search: ['title', 'excerpt', 'body'],
    orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }],
    filters: [
      {
        name: 'type',
        label: 'Type',
        options: [
          { value: 'NEWS', label: 'News' },
          { value: 'ANNOUNCEMENT', label: 'Announcement' },
          { value: 'ARTICLE', label: 'Article' },
        ],
      },
    ],
    columns: [
      { key: 'image', label: 'Image', kind: 'image' },
      { key: 'title', label: 'Title' },
      { key: 'type', label: 'Type', kind: 'badge' },
      { key: 'publishedAt', label: 'Published', kind: 'date' },
      { key: 'status', label: 'Status', kind: 'badge' },
    ],
    fields: [
      {
        name: 'type',
        label: 'Type',
        type: 'select',
        required: true,
        options: [
          { value: 'NEWS', label: 'News' },
          { value: 'ANNOUNCEMENT', label: 'Announcement' },
          { value: 'ARTICLE', label: 'Article' },
        ],
      },
      { name: 'title', label: 'Title', type: 'text', required: true, max: 255 },
      { name: 'slug', label: 'Web address (slug)', type: 'text', max: 191, autoSlugFrom: 'title', help: 'Leave blank to generate from the title.' },
      { name: 'dateLabel', label: 'Date shown on the card', type: 'text', max: 100, placeholder: 'e.g. October 2026', help: 'Optional. If blank, the publication date is used.' },
      { name: 'excerpt', label: 'Short summary', type: 'textarea', required: true, max: 600, rows: 3 },
      { name: 'body', label: 'Full text', type: 'textarea', max: 20000, rows: 10, help: 'Optional. Separate paragraphs with a blank line.' },
      { name: 'image', label: 'Cover image', type: 'image' },
      { name: 'href', label: 'External link', type: 'text', max: 500, help: 'Optional. Use only when the story lives on another page or website.' },
      bool('featured', 'Feature this post'),
    ],
  },
  {
    key: 'departments',
    label: 'Departments',
    singular: 'department',
    description: 'Academic departments and their heads.',
    model: 'department',
    titleField: 'name',
    imageField: 'image',
    search: ['name', 'shortName', 'head', 'summary'],
    orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
    columns: [
      { key: 'image', label: 'Image', kind: 'image' },
      { key: 'name', label: 'Department' },
      { key: 'head', label: 'Head' },
      { key: 'sortOrder', label: 'Order' },
      { key: 'status', label: 'Status', kind: 'badge' },
    ],
    fields: [
      { name: 'name', label: 'Department name', type: 'text', required: true, max: 255 },
      { name: 'shortName', label: 'Short name', type: 'text', required: true, max: 100 },
      { name: 'slug', label: 'Web address (slug)', type: 'text', required: true, max: 100, autoSlugFrom: 'shortName', help: 'Used in the page address. Changing it changes the department URL.' },
      { name: 'head', label: 'Head of department', type: 'text', required: true, max: 255 },
      { name: 'image', label: 'Department image', type: 'image', required: true },
      { name: 'summary', label: 'Summary', type: 'textarea', required: true, max: 2000, rows: 5 },
      { name: 'sortOrder', label: 'Display order', type: 'number' },
    ],
  },
  {
    key: 'courses',
    label: 'Courses',
    singular: 'course',
    description: 'Courses offered under each department.',
    model: 'course',
    titleField: 'name',
    include: { department: true },
    search: ['name', 'requirement', 'examiner'],
    orderBy: [{ departmentId: 'asc' }, { sortOrder: 'asc' }, { name: 'asc' }],
    columns: [
      { key: 'name', label: 'Course' },
      { key: 'department.shortName', label: 'Department' },
      { key: 'requirement', label: 'Entry requirement' },
      { key: 'duration', label: 'Duration' },
      { key: 'status', label: 'Status', kind: 'badge' },
    ],
    fields: [
      { name: 'departmentId', label: 'Department', type: 'select', required: true, optionsFrom: 'departments' },
      { name: 'name', label: 'Course name', type: 'text', required: true, max: 255 },
      { name: 'requirement', label: 'Entry requirement', type: 'text', required: true, max: 100, placeholder: 'e.g. KCSE D plain' },
      { name: 'duration', label: 'Duration', type: 'text', required: true, max: 100, placeholder: 'e.g. 2 years' },
      { name: 'examiner', label: 'Examining body', type: 'text', required: true, max: 100, placeholder: 'e.g. TVET CDACC' },
      { name: 'sortOrder', label: 'Display order', type: 'number' },
    ],
  },
  {
    key: 'staff',
    label: 'Leadership & staff',
    singular: 'profile',
    description: 'Board members, management and staff profiles.',
    model: 'staffProfile',
    titleField: 'name',
    imageField: 'photo',
    search: ['name', 'role', 'bio'],
    orderBy: [{ group: 'asc' }, { sortOrder: 'asc' }, { name: 'asc' }],
    filters: [
      {
        name: 'group',
        label: 'Group',
        options: [
          { value: 'BOARD', label: 'Board' },
          { value: 'MANAGEMENT', label: 'Management' },
          { value: 'STAFF', label: 'Staff' },
        ],
      },
    ],
    columns: [
      { key: 'photo', label: 'Photo', kind: 'image' },
      { key: 'name', label: 'Name' },
      { key: 'role', label: 'Role' },
      { key: 'group', label: 'Group', kind: 'badge' },
      { key: 'status', label: 'Status', kind: 'badge' },
    ],
    fields: [
      {
        name: 'group',
        label: 'Group',
        type: 'select',
        required: true,
        options: [
          { value: 'BOARD', label: 'Board of Governors' },
          { value: 'MANAGEMENT', label: 'Management' },
          { value: 'STAFF', label: 'Staff' },
        ],
      },
      { name: 'name', label: 'Full name', type: 'text', required: true, max: 255 },
      { name: 'role', label: 'Role / title', type: 'text', required: true, max: 255 },
      { name: 'photo', label: 'Photo', type: 'image' },
      { name: 'bio', label: 'Biography', type: 'textarea', max: 8000, rows: 8 },
      { name: 'sortOrder', label: 'Display order', type: 'number' },
    ],
  },
  {
    key: 'facilities',
    label: 'Facilities',
    singular: 'facility',
    description: 'Facilities shown in the campus facilities section.',
    model: 'facility',
    titleField: 'title',
    imageField: 'image',
    search: ['title', 'text'],
    orderBy: [{ sortOrder: 'asc' }, { title: 'asc' }],
    columns: [
      { key: 'title', label: 'Facility' },
      { key: 'icon', label: 'Icon' },
      { key: 'sortOrder', label: 'Order' },
      { key: 'status', label: 'Status', kind: 'badge' },
    ],
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true, max: 255 },
      { name: 'text', label: 'Description', type: 'textarea', required: true, max: 1000, rows: 4 },
      { name: 'icon', label: 'Icon', type: 'select', required: true, options: facilityIconNames.map((n) => ({ value: n, label: n })) },
      { name: 'image', label: 'Photo (optional)', type: 'image' },
      { name: 'sortOrder', label: 'Display order', type: 'number' },
    ],
  },
  {
    key: 'gallery',
    label: 'Gallery',
    singular: 'gallery image',
    description: 'Photos displayed in the homepage gallery.',
    model: 'galleryImage',
    titleField: 'alt',
    imageField: 'image',
    search: ['alt', 'caption'],
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    columns: [
      { key: 'image', label: 'Image', kind: 'image' },
      { key: 'alt', label: 'Description' },
      { key: 'caption', label: 'Caption' },
      { key: 'status', label: 'Status', kind: 'badge' },
    ],
    fields: [
      { name: 'image', label: 'Image', type: 'image', required: true },
      { name: 'alt', label: 'Image description (alt text)', type: 'text', required: true, max: 255 },
      { name: 'caption', label: 'Caption', type: 'text', max: 255 },
      { name: 'sortOrder', label: 'Display order', type: 'number' },
    ],
  },
  {
    key: 'downloads',
    label: 'Downloads & documents',
    singular: 'document',
    description: 'Forms, brochures and other files visitors can download.',
    model: 'download',
    titleField: 'title',
    search: ['title', 'category'],
    orderBy: [{ category: 'asc' }, { sortOrder: 'asc' }, { title: 'asc' }],
    columns: [
      { key: 'title', label: 'Title' },
      { key: 'category', label: 'Category' },
      { key: 'file', label: 'File' },
      { key: 'status', label: 'Status', kind: 'badge' },
    ],
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true, max: 255 },
      { name: 'category', label: 'Category', type: 'text', required: true, max: 100, placeholder: 'e.g. Admissions' },
      { name: 'file', label: 'File', type: 'file', required: true, help: 'PDF, Word or Excel document.' },
      { name: 'sortOrder', label: 'Display order', type: 'number' },
    ],
  },
  {
    key: 'testimonials',
    label: 'Testimonials',
    singular: 'testimonial',
    description: 'Quotes from trainees and alumni.',
    model: 'testimonial',
    titleField: 'name',
    search: ['quote', 'name', 'role'],
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
    columns: [
      { key: 'name', label: 'Name' },
      { key: 'role', label: 'Programme' },
      { key: 'quote', label: 'Quote' },
      { key: 'status', label: 'Status', kind: 'badge' },
    ],
    fields: [
      { name: 'quote', label: 'Quote', type: 'textarea', required: true, max: 1000, rows: 4 },
      { name: 'name', label: 'Name', type: 'text', required: true, max: 255 },
      { name: 'role', label: 'Programme / role', type: 'text', required: true, max: 255 },
      { name: 'sortOrder', label: 'Display order', type: 'number' },
    ],
  },
  {
    key: 'partners',
    label: 'Partners',
    singular: 'partner',
    description: 'Partner and affiliate organisations.',
    model: 'partner',
    titleField: 'name',
    imageField: 'logo',
    search: ['name', 'acronym'],
    orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
    columns: [
      { key: 'logo', label: 'Logo', kind: 'image' },
      { key: 'acronym', label: 'Acronym' },
      { key: 'name', label: 'Name' },
      { key: 'status', label: 'Status', kind: 'badge' },
    ],
    fields: [
      { name: 'acronym', label: 'Acronym', type: 'text', required: true, max: 50 },
      { name: 'name', label: 'Organisation name', type: 'text', required: true, max: 255 },
      { name: 'logo', label: 'Logo', type: 'image', required: true },
      { name: 'sortOrder', label: 'Display order', type: 'number' },
    ],
  },
]

export const resourceByKey = Object.fromEntries(resources.map((r) => [r.key, r])) as Record<string, Resource>

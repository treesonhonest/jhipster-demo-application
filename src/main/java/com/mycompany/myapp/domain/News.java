package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Type;

/**
 * A News.
 */
@Entity
@Table(name = "news")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class News implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "title")
    private String title;

    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "content")
    private String content;

    @Column(name = "top")
    private Boolean top;

    @Column(name = "top_time")
    private Instant topTime;

    @Column(name = "create_time")
    private Instant createTime;

    @Column(name = "update_time")
    private Instant updateTime;

    @Column(name = "read_count")
    private Long readCount;

    @OneToMany(mappedBy = "news")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "news" }, allowSetters = true)
    private Set<Comments> comments = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public News id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return this.title;
    }

    public News title(String title) {
        this.setTitle(title);
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return this.content;
    }

    public News content(String content) {
        this.setContent(content);
        return this;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Boolean getTop() {
        return this.top;
    }

    public News top(Boolean top) {
        this.setTop(top);
        return this;
    }

    public void setTop(Boolean top) {
        this.top = top;
    }

    public Instant getTopTime() {
        return this.topTime;
    }

    public News topTime(Instant topTime) {
        this.setTopTime(topTime);
        return this;
    }

    public void setTopTime(Instant topTime) {
        this.topTime = topTime;
    }

    public Instant getCreateTime() {
        return this.createTime;
    }

    public News createTime(Instant createTime) {
        this.setCreateTime(createTime);
        return this;
    }

    public void setCreateTime(Instant createTime) {
        this.createTime = createTime;
    }

    public Instant getUpdateTime() {
        return this.updateTime;
    }

    public News updateTime(Instant updateTime) {
        this.setUpdateTime(updateTime);
        return this;
    }

    public void setUpdateTime(Instant updateTime) {
        this.updateTime = updateTime;
    }

    public Long getReadCount() {
        return this.readCount;
    }

    public News readCount(Long readCount) {
        this.setReadCount(readCount);
        return this;
    }

    public void setReadCount(Long readCount) {
        this.readCount = readCount;
    }

    public Set<Comments> getComments() {
        return this.comments;
    }

    public void setComments(Set<Comments> comments) {
        if (this.comments != null) {
            this.comments.forEach(i -> i.setNews(null));
        }
        if (comments != null) {
            comments.forEach(i -> i.setNews(this));
        }
        this.comments = comments;
    }

    public News comments(Set<Comments> comments) {
        this.setComments(comments);
        return this;
    }

    public News addComments(Comments comments) {
        this.comments.add(comments);
        comments.setNews(this);
        return this;
    }

    public News removeComments(Comments comments) {
        this.comments.remove(comments);
        comments.setNews(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof News)) {
            return false;
        }
        return id != null && id.equals(((News) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "News{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", content='" + getContent() + "'" +
            ", top='" + getTop() + "'" +
            ", topTime='" + getTopTime() + "'" +
            ", createTime='" + getCreateTime() + "'" +
            ", updateTime='" + getUpdateTime() + "'" +
            ", readCount=" + getReadCount() +
            "}";
    }
}
